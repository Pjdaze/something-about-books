// src/utils/sortBooks.ts
import type { Book } from "../types/Book";
import type { SortKey, SortDirection } from "../types/Sort";

// Normalize strings so sorting is consistent
const normalize = (value?: string | null): string => value?.toLowerCase() ?? "";

export function sortBooks(
  books: Book[],
  key: SortKey,
  direction: SortDirection
): Book[] {
  const sorted = [...books]; // Don't mutate original list

  sorted.sort((a, b) => {
    switch (key) {
      case "title": {
        const titleA = normalize(a.title);
        const titleB = normalize(b.title);
        return titleA.localeCompare(titleB);
      }

      case "author": {
        const authorA = normalize(a.author_name?.[0]);
        const authorB = normalize(b.author_name?.[0]);
        return authorA.localeCompare(authorB);
      }

      case "first_publish_year": {
        const yearA = a.first_publish_year ?? 0;
        const yearB = b.first_publish_year ?? 0;
        return yearA - yearB;
      }

      case "edition_count": {
        const countA = a.edition_count ?? 0;
        const countB = b.edition_count ?? 0;
        return countA - countB;
      }

      default:
        return 0;
    }
  });

  return direction === "desc" ? sorted.reverse() : sorted;
}
