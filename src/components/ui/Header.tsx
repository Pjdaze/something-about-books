import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { to: "/", label: "Search" },
    { to: "/bookshelf", label: "My Bookshelf" },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="text-white shadow-md relative">
      <div className="mx-auto p-4 flex justify-between items-center max-w-7xl">
        <Link
          to="/"
          className="text-gray-700 font-bold text-[1.5rem] font-space-grotesk"
        >
          📚 Something About Books
        </Link>

        {/* Desktop Menu */}
        <nav className="items-center gap-4 hidden md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-gray-700 hover:text-slate-700 transition duration-150 focus:font-semibold"
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle />
        </nav>

        <button
          aria-label="Toggle mobile menu"
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-10 text-gray-800" />
          ) : (
            <Bars2Icon className="w-10 text-gray-800" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-4 top-20 w-48 bg-gray-200
                     shadow-xl rounded-xl p-4 space-y-4 animate-slideDown z-50"
        >
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block text-gray-700 dark:text-gray-700 hover:text-slate-700 dark:hover:text-slate-300 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-400 dark:border-gray-600">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
