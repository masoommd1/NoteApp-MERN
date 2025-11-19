import { PlusIcon, NotebookText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold flex items-center gap-1 font-mono tracking-tight text-success">
            <NotebookText />
            NoteBoard
          </h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle transition hover:scale-110"
            >
              {theme === "light" ? (
                <svg
                  className="fill-current text-yellow-500"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12a7 7 0 1 1 7 7 7 7 0 0 1-7-7zm7-9 1 4h-2Zm0 18 1-4h-2Zm9-9-4 1v-2Zm-18 0 4 1v-2Zm15.07 7.07-2.83-2.83 1.41-1.41Zm-12.14 0 2.83-2.83-1.41-1.41Zm12.14-12.14-2.83 2.83-1.41-1.41Zm-12.14 0 2.83 2.83 1.41-1.41Z" />
                </svg>
              ) : (
                <svg
                  className="fill-current text-blue-500"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>

            {/* Create Button */}
            <Link to="/create" className="btn btn-outline btn-success">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
