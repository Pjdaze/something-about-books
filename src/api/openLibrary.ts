import { type OpenLibrarySearchResponse, type Book, type DetailedBook } from '../types/Book';
export const SEARCH_API_URL = 'https://openlibrary.org/search.json';
export const DETAIL_API_BASE_URL = 'https://openlibrary.org';
export async function searchBooks(query: string, limit: number = 20): Promise<Book[]> {
  if (!query) return [];

  const url = `${SEARCH_API_URL}?q=${encodeURIComponent(query)}&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: Failed to fetch books for query "${query}". Status: ${response.status}`);
    }

    const data: OpenLibrarySearchResponse = await response.json();
    return data.docs;
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
        throw new Error(`Could not complete search. Details: ${error.message}`);
    }
    throw new Error('An unknown error occurred during the book search.');
  }
}

export const getCoverImageUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

export async function fetchBookDetails(workKey: string): Promise<DetailedBook> {
  const url = `${DETAIL_API_BASE_URL}${workKey}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: Failed to fetch details for key "${workKey}". Status: ${response.status}`);
    }

    const data: any = await response.json();

    return {
      title: data.title || 'Untitled',
      
      authors: data.authors 
          ? data.authors.map((a: any) => ({ name: a.author.key })) 
          : undefined,

      subjects: data.subjects,
      description: data.description,
    };
  } catch (error) {
    console.error('API Detail Error:', error);
    if (error instanceof Error) {
        throw new Error(`Could not complete detail fetch. Details: ${error.message}`);
    }
    throw new Error('An unknown error occurred during the book detail fetch.');
  }
}