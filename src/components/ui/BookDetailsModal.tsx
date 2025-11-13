import { useState, useEffect } from "react";

import { Spinner } from "./Spinner";
import { Button } from "./Button";

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

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>

        {loading && (
          <div className="py-10 flex justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-4 text-red-700 rounded my-4">
            {error}
          </div>
        )}

        {details && (
          <div>
            <h2 className="text-3xl font-bold mb-3 text-blue-700">
              {details.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Author(s):
              {details.authors?.map((a) => a.name).join(", ") || "N/A"}
            </p>

            <div className="space-y-4 text-gray-600">
              <p>
                **Subjects/Genres:** {details.subjects?.join(", ") || "N/A"}
              </p>
              <p className="text-sm">
                Description:{" "}
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
  );
};
