import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { useDebounce } from "../../hooks/useDebounce";

/**
 * Componente de input de busca com debounce e navegação automática
 * @param {Object} props
 * @param {string} props.placeholder - Texto placeholder para o input
 * @param {number} props.debounceDelay - Delay para debounce em ms (padrão: 500)
 * @param {number} props.minSearchLength - Tamanho mínimo para busca (padrão: 1)
 */
export default function SearchInput({
  placeholder = "Buscar anime...",
  debounceDelay = 500,
  minSearchLength = 1,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  // Hook de debounce para evitar chamadas excessivas
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  // Efeito para navegação quando o termo de busca muda
  useEffect(() => {
    const trimmedSearchTerm = debouncedSearchTerm.trim();

    if (trimmedSearchTerm.length >= minSearchLength) {
      setIsNavigating(true);

      startTransition(() => {
        navigate({
          to: "/anime",
          search: { query: trimmedSearchTerm },
        });
        setIsNavigating(false);
      });
    }
  }, [debouncedSearchTerm, navigate, minSearchLength]);

  // Handlers otimizados
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setIsNavigating(false);
  }, []);

  const onChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedTerm = searchTerm.trim();

      if (trimmedTerm.length >= minSearchLength) {
        navigate({
          to: "/anime",
          search: { query: trimmedTerm },
        });
      }
    },
    [searchTerm, navigate, minSearchLength]
  );

  // Estado de loading visual
  const isLoading = isPending || isNavigating;

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full sm:w-64 md:w-80"
      aria-live="polite"
      data-testid="search-form"
      role="search"
    >
      {/* Ícone de busca à esquerda */}
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
          isLoading ? "text-indigo-500 animate-pulse" : "text-gray-500"
        }`}
        size={18}
        aria-hidden="true"
        data-testid="search-icon"
      />

      <input
        type="text"
        placeholder={placeholder}
        aria-label={`Campo de busca: ${placeholder}`}
        aria-describedby="search-description"
        value={searchTerm}
        onChange={onChange}
        disabled={isLoading}
        className={`pl-10 pr-10 py-2 w-full rounded text-base bg-[#1a1a2e] text-[#a1a1a1] placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#8234e9] transition-all duration-200 ${
          isLoading ? "opacity-75 cursor-wait" : ""
        }`}
        data-testid="search-input"
        autoComplete="off"
        spellCheck="false"
      />

      {/* Texto de ajuda invisível para screen readers */}
      <div id="search-description" className="sr-only">
        Digite pelo menos {minSearchLength} caractere
        {minSearchLength > 1 ? "s" : ""} para buscar animes. A busca acontece
        automaticamente após você parar de digitar.
      </div>

      {/* Botão de limpar (ícone X) */}
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Limpar campo de busca"
          data-testid="clear-search-button"
        >
          <X size={18} />
        </button>
      )}

      {/* Indicador de loading visual */}
      {isLoading && (
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2"
          data-testid="search-loading-indicator"
          aria-label="Processando busca"
        >
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </form>
  );
}

// Adiciona PropTypes para melhor documentação (opcional)
SearchInput.displayName = "SearchInput";
