import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, User, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useThemeManager } from "../../providers/ThemeManager";
import ProfileDropdown from "../anime/ProfileDropdown";
import GenresDropdown from "./GenresDropdown";
import MobileMenu from "./MobileMenu";
import SearchInput from "./SearchInput";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { data: genres = [], isLoading } = useGenres();
  const { theme, getThemeClasses, toggleTheme } = useThemeManager();

  // Memorizar callbacks para evitar re-renders
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Memorizar classes CSS
  const headerClasses = useMemo(
    () =>
      `sticky top-0 w-full z-20 shadow-md py-4 transition-colors duration-200 ${
        getThemeClasses("header") ||
        (theme === "dark"
          ? "bg-[#0D0D1C]/95 backdrop-blur-sm shadow-black/20"
          : "bg-white/95 backdrop-blur-sm shadow-gray-200/50")
      }`,
    [theme, getThemeClasses]
  );

  const linkClasses = useMemo(
    () =>
      theme === "dark"
        ? "text-gray-300 hover:text-white transition-colors duration-200"
        : "text-gray-600 hover:text-gray-900 transition-colors duration-200",
    [theme]
  );

  return (
    <header className={headerClasses}>
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
        <h1
          className={`text-xl font-bold font-heading text-center sm:text-2xl transition-colors duration-200 ${
            theme === "dark"
              ? "text-indigo-400 hover:text-indigo-300"
              : "text-indigo-600 hover:text-indigo-700"
          }`}
        >
          <Link to="/" className="block">
            ANIMEHUB
          </Link>
        </h1>

        {/* Direita - Desktop (Navegação + Busca + Ações) */}
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex gap-6 text-gray-300 text-base">
            <Link to="/" className={linkClasses}>
              Início
            </Link>
            {/* Dropdown de gêneros */}
            {!isLoading && Array.isArray(genres) && genres.length > 0 && (
              <GenresDropdown genres={genres} theme={theme} />
            )}
            <Link to="/profile" className={linkClasses}>
              Perfil
            </Link>
            <Link to="/favorites" className={linkClasses}>
              Favoritos
            </Link>
            <Link to="/about" className={linkClasses}>
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

          {/* CONTROLE DE USUÁRIO LOGADO/INATIVO */}
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
