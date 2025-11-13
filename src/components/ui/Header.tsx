import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
export const Header: React.FC = () => (
  <header className="text-white shadow-md">
    <div className="container mx-auto p-4 flex justify-between items-center max-w-7xl">
      <div className=" dark:text-gray-700 font-bold">
        📚 Something About Books
      </div>

      <nav>
        <ThemeToggle />
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
      </nav>
    </div>
  </header>
);
