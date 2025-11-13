import { type Book } from "./Book";

export interface BookshelfState {
  books: Book[];
}
export interface BookshelfActions {
  addBook: (book: Book) => void;
  removeBook: (bookKey: string) => void;
  isBookOnShelf: (bookKey: string) => boolean;
}

export type BookshelfContextType = BookshelfState & BookshelfActions;
