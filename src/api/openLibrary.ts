import { type OpenLibrarySearchResponse, type Book, type DetailedBook } from '../types/Book';

export const SEARCH_API_URL = 'https://openlibrary.org/search.json';
export const DETAIL_API_BASE_URL = 'https://openlibrary.org';

async function fetchWithUserAgent(url: string) {
  return fetch(url, {
    headers: {
      "User-Agent": 'something-about-books-app/1.0 (pjdazeux@gmail.com)'
    }
  });
}

// Search
export async function searchBooks(query: string, limit: number = 20): Promise<Book[]> {
  if (!query) return [];

  const url = `${SEARCH_API_URL}?q=${encodeURIComponent(query)}&limit=${limit}`;

  try {
    const response = await fetchWithUserAgent(url);
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

// Detailed View
export async function fetchBookDetails(
  workKey: string,
  preFetchedAuthors?: string[]
): Promise<DetailedBook> {
  const url = `${DETAIL_API_BASE_URL}${workKey}.json`;

  try {
    const response = await fetchWithUserAgent(url);
    if (!response.ok) {
      throw new Error(
        `HTTP Error: Failed to fetch details for key "${workKey}". Status: ${response.status}`
      );
    }

    const data: any = await response.json();

    //  pre-fetched authors if available...
    let authors: { name: string }[] | undefined = undefined;
    if (preFetchedAuthors && preFetchedAuthors.length > 0) {
      authors = preFetchedAuthors.map(name => ({ name }));
    } else if (data.authors && Array.isArray(data.authors)) {
      authors = await Promise.all(
        data.authors.map(async (a: any) => {
          try {
            const authorRes = await fetchWithUserAgent(`${DETAIL_API_BASE_URL}${a.author.key}.json`);
            const authorData = await authorRes.json();
            return { name: authorData.name || "Unknown Author" };
          } catch {
            return { name: "Unknown Author" };
          }
        })
      );
    }

    return {
      title: data.title || "Untitled",
      authors,
      subjects: data.subjects,
      description: data.description,
    };
  } catch (error) {
    console.error("API Detail Error:", error);
    if (error instanceof Error) {
      throw new Error(
        `Could not complete detail fetch. Details: ${error.message}`
      );
    }
    throw new Error("An unknown error occurred during the book detail fetch.");
  }
}
