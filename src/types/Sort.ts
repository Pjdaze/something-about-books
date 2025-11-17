// src/types/Sort.ts
export type SortKey =
  | "title"
  | "author"
  | "first_publish_year"
  | "edition_count";
export type SortDirection = "asc" | "desc";

export interface SortState {
  key: SortKey;
  direction: SortDirection;
}
