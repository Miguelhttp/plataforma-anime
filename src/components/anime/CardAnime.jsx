import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { toast } from "react-toastify";

import { useFavoritesStore } from "../../store/favoritesStore";
import { useUser } from "@clerk/clerk-react";

function CardAnime({ anime, variant = "default" }) {
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const { isSignedIn } = useUser();

  const favorito = isFavorite(anime.mal_id);

  const toggleFavorite = () => {
    if (!isSignedIn) {
      toast.info("Você precisa estar logado para favoritar animes.");
      return;
    }

    if (favorito) {
      removeFavorite(anime.mal_id);
      toast.success("Anime removido dos favoritos!");
    } else {
      addFavorite(anime);
      toast.success("Anime adicionado aos favoritos!");
    }
  };

  if (variant === "list") {
    // Variante para lista vertical tipo notificação
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="dark:bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] w-full max-w-xl mx-auto flex gap-4 p-4 items-center relative"
        tabIndex={0}
      >
        <img
          src={anime.images?.jpg?.image_url ?? "/fallback-anime.jpg"}
          alt={anime.title}
          className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
          loading="lazy"
        />

        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={
            favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white hover:text-pink-400 transition-colors duration-200"
        >
          <Heart
            fill={favorito ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            size={24}
          />
        </button>

        <div className="flex flex-col justify-between flex-grow h-32">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2">
            {anime.title}
          </h3>

          <div className="flex flex-wrap gap-2 mt-1">
            {anime.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.mal_id}
                className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="px-3 py-1 rounded-md bg-[#2E2E48]">
              {anime.type}
            </span>
            <span className="flex items-center gap-1">
              <Star size={18} className="text-yellow-500" />
              {anime.score ?? "N/A"} pts
            </span>
          </div>

          <Link
            to={`/anime/${anime.mal_id}`}
            className="mt-2 bg-[#2e2e48] text-white text-base text-center py-1 rounded-md hover:bg-[#3e3e5c] transition-colors"
            tabIndex={-1}
          >
            Ver detalhes
          </Link>
        </div>
      </motion.div>
    );
  }

  // Variante padrão para Carrossel
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 w-[200px] relative"
    >
      <img
        src={anime.images?.jpg?.image_url ?? "/fallback-anime.jpg"}
        alt={anime.title}
        o
        className="w-full h-64 object-cover mask-b-from-100 mask-b-to-50 rounded-t-xl transition-transform hover:scale-105"
        loading="lazy"
      />

      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={
          favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white hover:text-pink-400 transition-colors duration-200"
      >
        <Heart
          fill={favorito ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          size={24}
        />
      </button>

      <div className="p-3 flex flex-col justify-between h-[180px] md:h-[200px]">
        <h3 className="text-white font-semibold text-sm line-clamp-2">
          {anime.title}
        </h3>

        <div className="flex justify-start items-center flex-row gap-1 mt-1">
          {anime.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.mal_id}
              className="text-xs bg-indigo-600 text-white px-1 py-0.5 rounded-full"
            >
              {genre.name ?? "N/A"}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <span className="px-2 py-1 rounded-md bg-[#2E2E48]">
            {anime.type}
          </span>
          <span className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            {anime.score ?? "N/A"} pts
          </span>
        </div>

        <Link
          to={`/anime/${anime.mal_id}`}
          className="mt-4 bg-[#2e2e48] text-white text-base text-center py-2 rounded-md hover:bg-[#3e3e5c] transition-colors"
        >
          Ver detalhes
        </Link>
      </div>
    </motion.div>
  );
}

function areEqual(prevProps, nextProps) {
  return (
    prevProps.anime.mal_id === nextProps.anime.mal_id &&
    prevProps.variant === nextProps.variant
  );
}

export default React.memo(CardAnime, areEqual);