import { Routes, Route, Navigate } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { BookshelfPage } from "./pages/bookshelf/BookshelfPage";

import { Header } from "./components/ui/Header";

const App = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-10">
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
