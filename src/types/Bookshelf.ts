import { type Book } from "./Book";

// Define the shape of the context state
export interface BookshelfState {
  books: Book[];
}

// Define the actions/functions the context will expose
export interface BookshelfActions {
  addBook: (book: Book) => void;
  removeBook: (bookKey: string) => void;
  isBookOnShelf: (bookKey: string) => boolean;
}

export type BookshelfContextType = BookshelfState & BookshelfActions;
