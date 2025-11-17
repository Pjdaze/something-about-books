// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BookshelfProvider } from "./context/BookshelfContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ViewModeProvider } from "./context/ViewModeContext.tsx";
import { SortProvider } from "./context/SortContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SortProvider>
          <BookshelfProvider>
            <ViewModeProvider>
              <App />
            </ViewModeProvider>
          </BookshelfProvider>
        </SortProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
