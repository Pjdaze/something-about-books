import { useSort } from "../../context/SortContext";
import type { SortKey, SortDirection } from "../../types/Sort";

export const SortDropdown: React.FC = () => {
  const { sortKey, sortDirection, setSortKey, setSortDirection } = useSort();

  return (
    <div className="flex gap-3 items-center">
      {/* Sort By */}
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as SortKey)}
        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="first_publish_year">First Publish Year</option>
        <option value="edition_count">Edition Count</option>
      </select>

      <select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value as SortDirection)}
        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
