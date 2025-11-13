import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Open Library Book Explorer
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex grow">
          <Input
            type="text"
            placeholder="Search by title, author, or keyword (e.g., Lord of the Rings)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Book search input"
          />
        </div>
        <Button
          type="submit"
          disabled={!searchTerm.trim()}
          className="sm:w-auto w-full"
        >
          Search Books
        </Button>
      </form>

      <div className="text-center text-gray-500 py-10">
        Start searching for books!
      </div>
    </div>
  );
};
