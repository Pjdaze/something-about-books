// src/context/BookshelfContext.tsx

import React, { createContext, useState, useContext } from "react";
import { type Book } from "../types/Book";
import {
  type BookshelfContextType,
  type BookshelfState,
} from "../types/Bookshelf";

const initialBookshelfState: BookshelfState = {
  books: [],
};

const BookshelfContext = createContext<BookshelfContextType | null>(null);

export const BookshelfProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookshelf, setBookshelf] = useState<BookshelfState>(
    initialBookshelfState
  );

  // --- Actions ---

  const addBook = (book: Book) => {
    if (!bookshelf.books.some((b) => b.key === book.key)) {
      const updatedBooks = [...bookshelf.books, book];
      setBookshelf({ books: updatedBooks });
      // saveBookshelf(updatedBooks); // For Bonus
    }
  };

  const removeBook = (bookKey: string) => {
    const updatedBooks = bookshelf.books.filter((b) => b.key !== bookKey);
    setBookshelf({ books: updatedBooks });
    // saveBookshelf(updatedBooks); // For Bonus
  };

  const isBookOnShelf = (bookKey: string): boolean => {
    return bookshelf.books.some((b) => b.key === bookKey);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue: BookshelfContextType = {
    ...bookshelf,
    addBook,
    removeBook,
    isBookOnShelf,
  };

  return (
    <BookshelfContext.Provider value={contextValue}>
      {children}
    </BookshelfContext.Provider>
  );
};

// Custom hook to consume the context easily
export const useBookshelf = () => {
  const context = useContext(BookshelfContext);
  if (!context) {
    throw new Error("useBookshelf must be used within a BookshelfProvider");
  }
  return context;
};
