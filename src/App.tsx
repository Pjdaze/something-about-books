import { Routes, Route, Navigate } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";

const AppHeader: React.FC = () => (
  <header className="bg-blue-600 text-white shadow-md">
    <div className="container mx-auto p-4 flex justify-between items-center max-w-7xl">
      <div className="text-xl font-bold">📚 Book Explorer</div>
    </div>
  </header>
);

const App = () => {
  return (
    <div>
      <AppHeader />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
