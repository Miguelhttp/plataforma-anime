import { Link } from "@tanstack/react-router";
import { Menu, Search, Sun, Moon, X, User } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import SearchInput from "./SearchInput";
import ProfileDropdown from "../anime/ProfileDropdown";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="stick w-full z-20 dark:bg-[#0D0D1C] shadow-md dark:shadow-black/20 py-4">
      {/* Container principal */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4">
        {/* Esquerda - Ícones Mobile */}
        <div className="flex items-center gap-4 sm:hidden">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            aria-label="Mostrar/Esconder busca"
            aria-pressed={showSearch}
          >
            <Search
              size={24}
              className="text-gray-300 hover:text-gray-500 transition-colors duration-200"
            />
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="abrir Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X
                size={28}
                className="text-gray-300 hover:text-gray-500 transition-colors duration-200"
              />
            ) : (
              <Menu
                size={28}
                className="text-gray-300 hover:text-gray-500 transition-colors duration-200"
              />
            )}
          </button>
        </div>

        {/* Centro - Título */}
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-white transition-colors text-center sm:text-2xl">
          <Link to="/">ANIMEHUB</Link>
        </h1>

        {/* Direita - Desktop (Navegação + Busca + Ações) */}
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex gap-6 text-gray-300 text-base">
            <Link
              to="/"
              className="hover:text-gray-500 dark:hover:text-white transition-colors"
            >
              Início
            </Link>
            <Link
              to="/profile"
              className="hover:text-gray-500 dark:hover:text-white transition-colors"
            >
              Perfil
            </Link>
            <Link
              to="/favorites"
              className="hover:text-gray-500 dark:hover:text-white transition-colors"
            >
              Favoritos
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-500 dark:hover:text-white transition-colors"
            >
              Sobre
            </Link>
          </nav>

          {/* Campo de busca */}
          <SearchInput placeholder="Buscar anime..." />

          {/* Botões tema/perfil */}
          <button onClick={toggleTheme} aria-label="Alternar tema">
            {theme === "dark" ? (
              <Sun className="text-yellow-400" size={22} />
            ) : (
              <Moon className="text-blue-600" size={22} />
            )}
          </button>

          {/* CONTROLE DE USUÁRIO LOGADO/DESLOGADO */}
          <SignedIn>
            <ProfileDropdown />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="btn-primary px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                aria-label="Entrar"
              >
                <User size={20} />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Busca Mobile */}
      {showSearch && (
        <div className="sm:hidden mt-4">
          <SearchInput placeholder="Buscar anime..." />
        </div>
      )}

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="sm:hidden mt-4 flex flex-col gap-2 text-white px-4"
          >
            <Link
              to="/"
              onClick={() => {
                setMenuOpen(false);
              }}
              className="hover:text-indigo-400"
            >
              Início
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-400"
            >
              Perfil
            </Link>
            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-400"
            >
              Favoritos
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
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
    </header>
  );
}
