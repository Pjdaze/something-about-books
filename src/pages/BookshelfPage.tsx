import { useState } from "react";
import { useBookshelf } from "../hooks/useBookshelf";
import { BookCard } from "../components/feature/BookCard";
import { BookDetailsModal } from "../components/ui/BookDetailsModal";
import { type Book } from "../types/Book";
import { useViewMode } from "../context/ViewModeContext";

export const BookshelfPage = () => {
  const { books } = useBookshelf();
  const [selectedBookKey, setSelectedBookKey] = useState<string | null>(null);
  const { viewMode, setViewMode } = useViewMode(); // use context

  const handleViewDetails = (book: Book) => {
    setSelectedBookKey(book.key);
  };

  const handleCloseDetails = () => {
    setSelectedBookKey(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {`You've Got ${books.length} ${
          books.length !== 1 ? "Books" : "Book"
        } in your Bookshelf`}
      </h1>

      {books.length > 0 && (
        <div className="flex items-center justify-end mb-4 gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded ${
              viewMode === "grid"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded ${
              viewMode === "list"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            List
          </button>
        </div>
      )}

      {books.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-xl">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Your bookshelf is empty!
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Search for books and click "Add to Shelf" to save them here.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onViewDetails={() => handleViewDetails(book)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {selectedBookKey && (
        <BookDetailsModal
          bookKey={selectedBookKey}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};
