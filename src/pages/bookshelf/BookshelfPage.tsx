import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookshelf } from "../../hooks/useBookshelf";
import { BookCard } from "../../components/feature/BookCard";
import { BookDetailsModal } from "../../components/ui/BookDetailsModal";
import { type Book } from "../../types/Book";
import { useViewMode } from "../../context/ViewModeContext";
import { getCoverImageUrl } from "../../api/openLibrary";
import "./coolBookshelf.css";

const BOOKS_PER_SHELF = 5;

export const BookshelfPage = () => {
  const { books, removeBook } = useBookshelf();
  const [selectedBookKey, setSelectedBookKey] = useState<string | null>(null);
  const { viewMode, setViewMode } = useViewMode();
  const [searchParams, setSearchParams] = useSearchParams();
  const bookKeyFromUrl = searchParams.get("book");

  useEffect(() => {
    if (bookKeyFromUrl) setSelectedBookKey(bookKeyFromUrl);
  }, [bookKeyFromUrl]);

  const handleViewDetails = (book: Book) => {
    setSelectedBookKey(book.key);
    setSearchParams({ book: book.key });
  };

  const handleCloseDetails = () => {
    setSelectedBookKey(null);
    setSearchParams({});
  };
  const handleRemove = (e: React.MouseEvent, bookKey: string) => {
    e.stopPropagation();
    removeBook(bookKey);
  };

  const getCoverUrl = (book: Book) => {
    if (book.cover_i) return getCoverImageUrl(book.cover_i, "L");
    return "";
  };

  // Calculate how many shelves are needed. Ensure at least one shelf.
  const shelfCount = Math.ceil(books.length / BOOKS_PER_SHELF) || 1;
  const shelves = Array.from({ length: shelfCount }, (_, i) => i);

  // NOTE: using custom css for the bookshelf temporary solution

  return (
    <div
      className={`container mx-auto p-4 max-w-7xl ${
        viewMode === "grid" ? "cb-root" : ""
      }`}
    >
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
                ? "bg-transparent dark:text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Shelf View
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded ${
              viewMode === "list"
                ? "bg-transparent dark:text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            List View
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
        <>
          {viewMode === "list" && (
            // List View uses existing BookCard component for list
            <div className="flex lg:w-1/2 flex-col gap-4">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onViewDetails={() => handleViewDetails(book)}
                  viewMode={viewMode} // Pass 'list' mode
                />
              ))}
            </div>
          )}

          {viewMode === "grid" && (
            // Grid uses coolBookshelf.css classes
            <div className="cb-wrapper">
              <div className="cb-shelves-container">
                {/* Render shelves in reverse order */}
                {shelves.reverse().map((shelfIndex) => {
                  // Determine the slice of books for this shelf
                  const start = shelfIndex * BOOKS_PER_SHELF;
                  const end = start + BOOKS_PER_SHELF;
                  const booksOnShelf = books.slice(start, end);

                  return (
                    <div key={shelfIndex} className="cb-shelf-layer">
                      {/* The static bookshelf element */}
                      <div className="cb-bookshelf" aria-hidden="true" />

                      <div className="cb-books">
                        {booksOnShelf.map((book) => {
                          const cover = getCoverUrl(book);

                          return (
                            <div
                              key={book.key}
                              className="cb-book"
                              style={
                                {
                                  "--bg-image": cover
                                    ? `url('${cover}')`
                                    : `url('https://placehold.co/115x180/f3f3f3/aaa?text=No+Cover')`,
                                } as React.CSSProperties
                              }
                              onClick={() => handleViewDetails(book)}
                              title={`View details for ${book.title}`}
                              tabIndex={0}
                            >
                              <button
                                className="cb-remove-btn"
                                onClick={(e) => handleRemove(e, book.key)}
                                title={`Remove ${book.title} from shelf`}
                                aria-label={`Remove ${book.title} from shelf`}
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
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
