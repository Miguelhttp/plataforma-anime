import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, User, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useGenres } from "../../hooks/useGenres";
import ProfileDropdown from "../anime/ProfileDropdown";
import GenresDropdown from "./GenresDropdown";
import MobileMenu from "./MobileMenu";
import SearchInput from "./SearchInput";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { data: genres = [], isLoading, isError } = useGenres();

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
          <nav className="flex gap-6 sm:px-2 text-gray-300 text-base">
            <Link
              to="/"
              className="hover:text-gray-500 dark:hover:text-white transition-colors"
            >
              Início
            </Link>
            {isLoading ? (
              <span className="text-gray-300 animate-pulse">
                Carregando gêneros...
              </span>
            ) : isError ? (
              <span className="text-red-500">Erro ao carregar gêneros</span>
            ) : genres.length > 0 ? (
              <GenresDropdown genres={genres} />
            ) : (
              <span className="text-gray-300 opacity-50">
                Gêneros indisponíveis
              </span>
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
        <div className="sm:hidden mt-4 px-4">
          <SearchInput placeholder="Buscar anime..." />
        </div>
      )}

      {/* Menu Mobile */}
      <MobileMenu menuOpen={menuOpen} closeMenu={closeMenu} />
    </header>
  );
}
