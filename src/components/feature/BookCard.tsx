import { type Book } from "../../types/Book";
import { getCoverImageUrl } from "../../api/openLibrary";

interface BookCardProps {
  book: Book;
}

const PLACEHOLDER_COVER =
  "https://via.placeholder.com/128x193.png?text=No+Cover";

export const BookCard = ({ book }: BookCardProps) => {
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
        {/* Book Details: Use flex-col to stack items vertically */}
        <div className="flex-col justify-between flex grow min-w-0">
          <div>
            {/* Title */}
            <h3
              className="text-lg font-bold text-gray-900 line-clamp-2 mb-1" // Use line-clamp-2 to prevent overflow
              title={book.title}
            >
              {book.title}
            </h3>

            {/* Author(s) */}
            <p className="text-sm text-gray-600 mb-2 italic line-clamp-1">
              By {authors}
            </p>

            {/* First Publish Year */}
            <p className="text-xs text-gray-500">
              <strong className="font-semibold">Year Published:</strong>{" "}
              {book.first_publish_year || "N/A"}
            </p>
          </div>

          {/* Bookshelf Toggle is pushed to the bottom due to justify-between */}
          <div className="mt-4 self-start">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              [Add/Remove Placeholder]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
