import { type OpenLibrarySearchResponse, type Book } from '../types/Book';

export const SEARCH_API_URL = 'https://openlibrary.org/search.json';

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query) return [];

  const url = `${SEARCH_API_URL}?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);


    if (!response.ok) {

      throw new Error(`HTTP Error: Failed to fetch books for query "${query}". Status: ${response.status}`);
    }

    const data: OpenLibrarySearchResponse = await response.json();

    
    // Return the list of books
    return data.docs;
    
  } catch (error) {

    console.error('API Error:', error);


    if (error instanceof Error) {
        throw new Error(`Could not complete search. Details: ${error.message}`);
    }
    
    // fallback err
    throw new Error('An unknown error occurred during the book search.');
  }
}

// helper to construct the cover image URL 
export const getCoverImageUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;