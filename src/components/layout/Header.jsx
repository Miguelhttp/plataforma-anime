import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, User, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useThemeStore } from "../../store/themeStore";
import ProfileDropdown from "../anime/ProfileDropdown";
import GenresDropdown from "./GenresDropdown";
import MobileMenu from "./MobileMenu";
import SearchInput from "./SearchInput";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { data: genres = [], isLoading } = useGenres();

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
            onClick={toggleMenu}
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
            {/* Dropdown de gêneros */}
            {!isLoading && Array.isArray(genres) && genres.length > 0 && (
              <GenresDropdown genres={genres} />
            )}
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
      <MobileMenu
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </header>
  );
}
