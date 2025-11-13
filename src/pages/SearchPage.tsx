import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";

import { searchBooks } from "../api/openLibrary";

import { BookDetailsModal } from "../components/ui/BookDetailsModal";
import { type Book } from "../types/Book";
import { BookCard } from "../components/feature/BookCard";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedBookKey, setSelectedBookKey] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      const results = await searchBooks(searchTerm);
      setBooks(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown search error occurred."
      );
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Open Library Book Explorer
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex grow">
          <Input
            type="text"
            placeholder="Search by title, author, or keyword (e.g., Lord of the Rings)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Book search input"
          />
        </div>
        <Button
          type="submit"
          disabled={!searchTerm.trim() || loading}
          className="sm:w-auto w-full"
        >
          {loading ? "Searching..." : "Search Books"}
        </Button>
      </form>

      <div className="mt-8">
        {loading && (
          <div className="flex items-center justify-center py-10 text-gray-600">
            <Spinner size="lg" />
            <p className="ml-3">Searching the Open Library...</p>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Search Failed:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
        {!loading && !error && hasSearched && books.length === 0 && (
          <p className="text-gray-600 text-center py-10">
            No results found for "{searchTerm}". Try a different query.
          </p>
        )}

        {!loading && !error && !hasSearched && (
          <div className="text-center text-gray-500 py-10">
            Enter a query above to begin exploring books!
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              Found **{books.length}** relevant works.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onViewDetails={() => setSelectedBookKey(book.key)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <BookDetailsModal
        bookKey={selectedBookKey}
        onClose={() => setSelectedBookKey(null)}
      />
    </div>
  );
};
