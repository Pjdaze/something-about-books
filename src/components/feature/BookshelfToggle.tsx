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
      aria-pressed={isOnShelf}
      className={`
    px-3 py-1.5 text-sm font-medium
    rounded-md text-white
    transition
    ${
      isOnShelf
        ? "bg-red-500 hover:bg-red-600"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
    >
      <span className="block sm:hidden">{isOnShelf ? "Remove" : "Add"}</span>
      <span className="hidden sm:block">
        {isOnShelf ? "Remove from Shelf" : "Add to Shelf"}
      </span>
    </button>
  );
};
