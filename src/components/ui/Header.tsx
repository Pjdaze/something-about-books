import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
export const Header: React.FC = () => (
  <header className="text-white shadow-md">
    <div className="mx-auto p-4 flex justify-between items-center max-w-7xl">
      <div className="text-gray-700 font-bold text-2xl">
        📚 Something About Books
      </div>

      <nav className="flex items-center gap-2">
        <Link
          to="/"
          className="text-gray-700 hover:text-slate-700 transition duration-150 mr-6 focus:font-semibold"
        >
          Search
        </Link>
        <Link
          to="/bookshelf"
          className="text-gray-700 hover:text-slate-700 transition duration-150 focus:font-semibold"
        >
          My Bookshelf
        </Link>

        <ThemeToggle />
      </nav>
    </div>
  </header>
);
