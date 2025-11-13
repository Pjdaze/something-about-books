import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BookshelfProvider } from "./context/BookshelfContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BookshelfProvider>
        <App />
      </BookshelfProvider>
    </BrowserRouter>
  </StrictMode>
);
