import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function GenresDropdown({ genres }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha ao clicar fora do dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha ao pressionar ESC
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 hover:text-indigo-500 dark:hover:text-white transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        type="button"
      >
        Gêneros <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full mt-1 w-44 max-h-64 overflow-y-auto rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-50 text-gray-200 text-sm z-30 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800"
          >
            {Array.isArray(genres) &&
              genres.map((genre) => (
                <li
                  key={genre.mal_id}
                  className="px-4 py-2 hover:bg-indigo-600 cursor-pointer"
                >
                  <Link
                    to={`/genres/${genre.mal_id}`}
                    onClick={() => setOpen(false)}
                    className="block"
                    role="menuitem"
                    tabIndex={0}
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
