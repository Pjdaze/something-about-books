import { type Book } from "../../types/Book";
import { getCoverImageUrl } from "../../api/openLibrary";
import { useBookshelf } from "../../hooks/useBookshelf";

interface BookCardProps {
  book: Book;
}

const PLACEHOLDER_COVER =
  "https://via.placeholder.com/128x193.png?text=No+Cover";

export const BookCard = ({ book }: BookCardProps) => {
  const { addBook, removeBook, isBookOnShelf } = useBookshelf();

  const isOnShelf = isBookOnShelf(book.key);

  const handleToggle = () => {
    if (isOnShelf) {
      removeBook(book.key);
    } else {
      addBook(book);
    }
  };
  const coverUrl = book.cover_i
    ? getCoverImageUrl(book.cover_i, "M")
    : PLACEHOLDER_COVER;

  const authors = book.author_name?.join(", ") || "Unknown Author";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition transform hover:shadow-xl hover:scale-[1.02]">
      <div className="flex p-4 h-full">
        <div className="flex shrink-0 mr-4">
          <img
            src={coverUrl}
            alt={`Cover for ${book.title}`}
            className="w-24 h-36 object-cover rounded-md"
            loading="lazy"
          />
        </div>

        <div className="flex-col justify-between flex grow min-w-0">
          <div>
            <h3
              className="text-lg font-bold text-gray-900 line-clamp-2 mb-1"
              title={book.title}
            >
              {book.title}
            </h3>

            <p className="text-sm text-gray-600 mb-2 italic line-clamp-1">
              By {authors}
            </p>

            <p className="text-xs text-gray-500">
              <strong className="font-semibold">Year Published:</strong>{" "}
              {book.first_publish_year || "N/A"}
            </p>
          </div>

          <div className="flex flex-col justify-between grow min-w-0">
            <div className="mt-4 self-start">
              <button
                onClick={handleToggle}
                className={`
                      text-sm font-medium px-2 py-1 rounded transition 
                      ${
                        isOnShelf
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }
                    `}
              >
                {isOnShelf ? "Remove from Shelf" : "Add to Shelf"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
