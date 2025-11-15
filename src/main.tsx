// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BookshelfProvider } from "./context/BookshelfContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ViewModeProvider } from "./context/ViewModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BookshelfProvider>
          <ViewModeProvider>
            <App />
          </ViewModeProvider>
        </BookshelfProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
