import { type Book } from "../../types/Book";
import { getCoverImageUrl } from "../../api/openLibrary";

import { BookshelfToggle } from "./BookshelfToggle";

interface BookCardProps {
  book: Book;
  onViewDetails: () => void;
  viewMode?: "grid" | "list"; // new prop
}

const PLACEHOLDER_COVER =
  "https://via.placeholder.com/128x193.png?text=No+Cover";
export const BookCard = ({
  book,
  onViewDetails,
  viewMode = "grid",
}: BookCardProps) => {
  const coverUrl = book.cover_i
    ? getCoverImageUrl(book.cover_i, "M")
    : PLACEHOLDER_COVER;

  const authors = book.author_name?.join(", ") || "Unknown Author";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onViewDetails();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onViewDetails}
      onKeyDown={handleKeyPress}
      aria-label={`View details for "${book.title}" by ${authors}`}
      className={`dark:bg-gray-200 rounded-lg shadow-md overflow-hidden transition transform hover:shadow-xl hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div className={`flex p-4 h-full ${viewMode === "list" ? "gap-4" : ""}`}>
        {/* Cover Image */}
        <div className={`flex shrink-0 ${viewMode === "list" ? "" : "mr-4"}`}>
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className={`object-cover rounded-md ${
              viewMode === "list" ? "w-24 h-36" : "w-full h-48"
            }`}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-between grow min-w-0">
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
