export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
}

interface DetailedAuthor {
  name: string;
}

export interface DetailedBook {
  title: string;
  authors?: DetailedAuthor[];
  subjects?: string[];
  description: string | { type: string; value: string } | undefined;
}
