import { type Book } from "../../types/Book";
import { getCoverImageUrl } from "../../api/openLibrary";

import { BookshelfToggle } from "./BookshelfToggle";

interface BookCardProps {
  book: Book;
  onViewDetails: () => void;
}

const PLACEHOLDER_COVER =
  "https://via.placeholder.com/128x193.png?text=No+Cover";

export const BookCard = ({ book, onViewDetails }: BookCardProps) => {
  const coverUrl = book.cover_i
    ? getCoverImageUrl(book.cover_i, "M")
    : PLACEHOLDER_COVER;

  const authors = book.author_name?.join(", ") || "Unknown Author";

  return (
    <div
      onClick={onViewDetails}
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition transform hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
      <div className="flex p-4 h-full">
        {/* Cover Image */}
        <div className="flex shrink-0 mr-4">
          <img
            src={coverUrl}
            alt={`Cover for ${book.title}`}
            className="w-24 h-36 object-cover rounded-md"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-between grow min-w-0">
          <div>
            {/* Title, Author, Year */}
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
              <strong className="font-semibold">Pub. Year:</strong>{" "}
              {book.first_publish_year || "N/A"}
            </p>
          </div>

          <div className="mt-4 self-start">
            <BookshelfToggle book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};
