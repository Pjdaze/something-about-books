import { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Spinner } from "./Spinner";
import { fetchBookDetails } from "../../api/openLibrary";
import { type DetailedBook } from "../../types/Book";

interface BookDetailsModalProps {
  bookKey: string | null;
  onClose: () => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  bookKey,
  onClose,
}) => {
  const [details, setDetails] = useState<DetailedBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bookKey) {
      setDetails(null);
      return;
    }

    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      setDetails(null);
      try {
        const data = await fetchBookDetails(bookKey);
        setDetails(data);
      } catch (e) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [bookKey]);

  if (!bookKey) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transform transition-all duration-300 scale-100 hover:scale-[1.01]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
        </button>

        {/* Content */}
        <div className="p-8">
          {loading && (
            <div className="py-10 flex justify-center">
              <Spinner size="lg" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 p-4 text-red-700 rounded-lg my-4 text-center font-medium">
              {error}
            </div>
          )}

          {details && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {details.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  by{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {details.authors?.map((a) => a.name).join(", ") ||
                      "Unknown"}
                  </span>
                </p>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="space-y-3 text-gray-700 dark:text-gray-400 leading-relaxed">
                <div className="flex flex-wrap gap-2">
                  {(details.subjects || ["N/A"]).map((subj) => (
                    <span
                      key={subj}
                      className="px-3 py-1 text-sm bg-gray-800 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-700 transition"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {typeof details.description === "string"
                    ? details.description
                    : (details.description as any)?.value ||
                      "No description available."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
