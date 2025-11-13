import { useBookshelf } from "../hooks/useBookshelf";
import { BookCard } from "../components/feature/BookCard";

export const BookshelfPage = () => {
  const { books } = useBookshelf();

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {`You've Got ${books.length}  ${
          books.length > 1 ? "Books" : "Book"
        } in your Bookshelf`}
      </h1>

      {books.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-4">Your bookshelf is empty!</p>
          <p className="text-gray-500">
            Search for books and click "Add to Shelf" to save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onViewDetails={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
