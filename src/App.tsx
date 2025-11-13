import { Routes, Route, Navigate, Link } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { BookshelfPage } from "./pages/BookshelfPage";

const AppHeader: React.FC = () => (
  <header className="bg-blue-600 text-white shadow-md">
    <div className="container mx-auto p-4 flex justify-between items-center max-w-7xl">
      <div className="text-xl font-bold">📚 Book Explorer</div>

      <nav>
        <Link
          to="/"
          className="text-white hover:text-blue-200 transition duration-150 mr-6"
        >
          Search
        </Link>
        <Link
          to="/bookshelf"
          className="text-white hover:text-blue-200 transition duration-150 font-semibold"
        >
          My Bookshelf
        </Link>
      </nav>
    </div>
  </header>
);

const App = () => {
  return (
    <div>
      <AppHeader />
      <div className="min-h-screen bg-gray-50 pb-10">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />{" "}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
