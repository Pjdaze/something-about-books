import { type Book } from "../../types/Book";
import { getCoverImageUrl } from "../../api/openLibrary";
import { BookshelfToggle } from "./BookshelfToggle";

interface BookCardProps {
  book: Book;
  onViewDetails: () => void;
  viewMode?: "grid" | "list";
}

export const BookCard = ({
  book,
  onViewDetails,
  viewMode = "grid",
}: BookCardProps) => {
  const PLACEHOLDER_COVER = `https://placehold.co/2x15/EEE/31343C?font=oswald&text=${book.title}`;
  const coverUrl = book.cover_i
    ? getCoverImageUrl(book.cover_i, "M")
    : PLACEHOLDER_COVER;

  const authors = book.author_name?.join(", ") || "Unknown Author";

  return (
    <div
      className={`

    dark:bg-transparent shadow-md  rounded-lg overflow-hidden transition: ;
    hover:shadow-lg hover:scale-[1.02]
    focus-within:ring-2 focus-within:ring-blue-500
    ${viewMode === "list" ? "flex border-0" : "flex flex-col h-[420px]"}
  `}
    >
      <div
        className={`flex p-4 h-full ${
          viewMode === "list" ? "gap-4" : "flex-col"
        }`}
      >
        {/* Cover Image */}
        <div
          className={`
        overflow-hidden rounded-lg 
        ${
          viewMode === "list"
            ? "w-[200px]  h-36"
            : "w-full aspect-2/3 max-h-[250px]"
        }
      `}
        >
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-between grow min-w-0 mt-3">
          <div>
            <h3
              className="text-lg font-bold text-gray-900 line-clamp-2 mb-1"
              title={book.title}
            >
              {book.title}
            </h3>

            <p className="text-sm text-wrap text-gray-600 mb-2 italic line-clamp-1">
              By {authors.length > 20 ? `${authors.slice(0, 20)}...` : authors}
            </p>

            <p className="text-xs text-gray-500">
              <strong className="font-semibold">Pub. Year:</strong>{" "}
              {book.first_publish_year || "N/A"}
            </p>
          </div>

          <div className="mt-auto flex  gap-3 pt-3">
            <BookshelfToggle book={book} />

            <button
              onClick={onViewDetails}
              className="bg-blue-500 dark:bg-orange-500 px-3 py-1 
          text-white rounded focus:outline-none focus:ring-2 
          focus:ring-blue-500"
              aria-label={`View details for "${book.title}"`}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
