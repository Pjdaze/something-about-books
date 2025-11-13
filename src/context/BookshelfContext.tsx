import React, { createContext, useState, useEffect } from "react";
import { type Book } from "../types/Book";
import { loadBookshelf, saveBookshelf } from "../utils/localStorage";
import {
  type BookshelfContextType,
  type BookshelfState,
} from "../types/Bookshelf";

const initialBookshelfState: BookshelfState = {
  books: loadBookshelf(),
};

export const BookshelfContext = createContext<BookshelfContextType | null>(
  null
);

export const BookshelfProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookshelf, setBookshelf] = useState<BookshelfState>(
    initialBookshelfState
  );

  useEffect(() => {
    saveBookshelf(bookshelf.books);
  }, [bookshelf.books]);

  const addBook = (book: Book) => {
    if (!bookshelf.books.some((b) => b.key === book.key)) {
      const updatedBooks = [...bookshelf.books, book];
      setBookshelf({ books: updatedBooks });
    }
  };

  const removeBook = (bookKey: string) => {
    const updatedBooks = bookshelf.books.filter((b) => b.key !== bookKey);
    setBookshelf({ books: updatedBooks });
  };

  const isBookOnShelf = (bookKey: string): boolean => {
    return bookshelf.books.some((b) => b.key === bookKey);
  };

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
