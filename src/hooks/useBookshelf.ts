// src/hooks/useBookshelf.tsx

import { useContext } from 'react';
import { BookshelfContext } from "../context/BookshelfContext"

export const useBookshelf = () => {
  const context = useContext(BookshelfContext);
  if (!context) {
    throw new Error("useBookshelf must be used within a BookshelfProvider");
  }
  return context;
};