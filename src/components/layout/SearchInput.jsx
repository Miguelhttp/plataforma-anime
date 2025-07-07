import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({ placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate({
        to: "/anime",
        search: { query: trimmedTerm },
      });
      setSearchTerm(""); // limpa o campo
    }
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:w-64 md:w-80">
      {/* Ícone de busca à esquerda */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />

      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-10 py-2 w-full rounded text-base bg-[#1a1a2e] text-[#a1a1a1] placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#8234e9] transition"
      />

      {/* Botão de limpar (ícone X) */}
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          aria-label="Limpar busca"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
}
