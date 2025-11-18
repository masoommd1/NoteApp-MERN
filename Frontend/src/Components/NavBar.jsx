import { PlusIcon, NotebookText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage only after component mounts
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  if (!mounted) {
    // Server-side render fallback
    return (
      <header className="border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <div className="skeleton h-8 w-32"></div>
            <div className="skeleton h-10 w-32"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-1 font-mono tracking-tight text-success">
            <NotebookText />
            NoteBoard
          </h1>
          <div className="flex items-center gap-4">
            <label className="swap swap-rotate scale-150 cursor-pointer">
              <input 
                type="checkbox" 
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              {/* Your SVG icons */}
            </label>
            <Link to={"/create"} className="btn btn-outline btn-success">
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