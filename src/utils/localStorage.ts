import { type Book } from '../types/Book';

const BOOKSHELF_STORAGE_KEY = 'myBookshelf';

export const loadBookshelf = (): Book[] => {
  try {
    const serializedState = localStorage.getItem(BOOKSHELF_STORAGE_KEY);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState) as Book[];
  } catch (e) {
    console.error("Could not load bookshelf from local storage", e);
    return [];
  }
};


export const saveBookshelf = (books: Book[]): void => {
  try {
    const serializedState = JSON.stringify(books);
    localStorage.setItem(BOOKSHELF_STORAGE_KEY, serializedState);
  } catch (e) {
    console.error("Could not save bookshelf to local storage", e);
  }
};