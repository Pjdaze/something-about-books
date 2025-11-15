import React from "react";
import { useBookshelf } from "../../hooks/useBookshelf";
import { type Book } from "../../types/Book";

interface BookshelfToggleProps {
  book: Book;
}

export const BookshelfToggle: React.FC<BookshelfToggleProps> = ({ book }) => {
  const { addBook, removeBook, isBookOnShelf } = useBookshelf();

  const isOnShelf = isBookOnShelf(book.key);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOnShelf) {
      removeBook(book.key);
    } else {
      addBook(book);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={isOnShelf} // for accessibility..
      className={`
      px-3 py-1.5 text-sm font-medium

      rounded-md text-gray-700
      hover:bg-gray-100
 dark:text-gray-200 dark:hover:bg-gray-800
      transition

      ${
        isOnShelf
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-green-500 text-white hover:bg-green-600"
      }
    `}
    >
      {isOnShelf ? "Remove from Shelf" : "Add to Shelf"}
    </button>
  );
};
