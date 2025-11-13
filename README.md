📚 **Open Library Book Explorer**

A modern React + TypeScript application that allows users to search, explore, and manage books from the Open Library API. Users can search for books, view detailed information, and maintain a personal bookshelf that persists across sessions.

**Key Features**

1. Search & Exploration

Search Books: Search by title, author, or keyword.

Result View: View results showing Title, Author(s), First Publish Year, and Cover Image.

View Toggle: Easily switch between Grid and List view modes across the entire app.

2. Book Details

Click the "Details" button on any book card to open a sleek, modern modal with detailed metadata:

Title & Authors

Subjects / Genres (rendered as clean tags)

Description (if available)

Handles loading states and API errors gracefully.

3. Personal Bookshelf

Persistence: Bookshelf state is managed via React Context and persisted locally using localStorage.

Dedicated Page: A "My Bookshelf" page shows all saved books.

Management: Easily add or remove books from your shelf using the toggle button.

4. User Experience & Aesthetics

Dark Mode: Full support for a modern dark/light theme toggle using Tailwind CSS dark: utilities.

Responsive Layout: Fully responsive UI for optimal viewing on mobile, tablet, and desktop devices.

⚙️ Tech Stack

Frontend: React + TypeScript

Styling: TailwindCSS (utility-first, responsive, and dark/light themes)

Bundling: Vite (for fast development and build times)

State Management: React Context (useBookshelf for core state, ViewModeContext for global layout)

Persistence: Browser localStorage

Data Source: Open Library API

🚀 **Getting Started**

To get the project running locally:

# 1. Install dependencies

npm install

# or

yarn install

# 2. Run the development server

npm run dev

# or

yarn dev

Open http://localhost:5173 to view the app in your browser.

📝 Developer Notes

React + TypeScript + Vite Setup

This project uses the standard Vite setup with React + TypeScript.

ESLint Configuration

The project is configured for strict, type-aware linting using recommended rulesets for a production-ready application structure.
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
// eslint.config.js (Example structure)
import { defineConfig, globalIgnores } from 'eslint-define-config';
import tseslint from 'typescript-eslint';

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```
