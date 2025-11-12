export interface Book {
  key: string; 
  title: string;
  author_name?: string[]; 
  first_publish_year?: number;
  cover_i?: number; 
}
// overall structure of the API response
export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[]; 
}
