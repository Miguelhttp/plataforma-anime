import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useGenres } from "../../hooks/useGenres";
import React from "react";
import GenresDropdown from "./GenresDropdown";

const MobileMenu = React.memo(({ menuOpen, closeMenu, toggleTheme, theme }) => {
  const { data: genres = [], isLoading } = useGenres();
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="sm:hidden mt-4 flex flex-col gap-2 text-white px-4"
        >
          <Link to="/" onClick={closeMenu} className="hover:text-indigo-400">
            Início
          </Link>
          {/* Verificar se o array de gêneros não está vazio */}
          {!isLoading && Array.isArray(genres) && genres.length > 0 && (
            <GenresDropdown genres={genres} />
          )}
          <Link
            to="/profile"
            onClick={closeMenu}
            className="hover:text-indigo-400"
          >
            Perfil
          </Link>
          <Link
            to="/favorites"
            onClick={closeMenu}
            className="hover:text-indigo-400"
          >
            Favoritos
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="hover:text-indigo-400"
          >
            Sobre
          </Link>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 mt-2"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            Alternar tema
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;
