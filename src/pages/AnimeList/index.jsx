import { useMemo } from "react";
import { useSearch } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import CardAnime from "../../components/anime/CardAnime";
import CardAnimeSkeleton from "../../components/anime/CardAnimeSkeleton";
import { useSearchAnimes } from "../../hooks/useSearchAnimes";

export default function AnimeList() {
  const { query } = useSearch({ from: "/anime" });
  const { data: animes, isLoading, isError } = useSearchAnimes(query);

  // Usar useMemo para evitar re-renderizações desnecessárias
  const renderedAnimes = useMemo(() => {
    return animes?.map((anime) => (
      <CardAnime key={anime.mal_id} anime={anime} variant="list" />
    ));
  }, [animes]);

  return (
    <main className="px-4 max-w-6xl mx-auto text-white min-h-screen pb-24">
      <h2 className="text-3xl font-bold mt-6 text-center">
        Resultados para: <span className="text-indigo-400">{query}</span>
      </h2>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {[...Array(8)].map((_, i) => (
            <CardAnimeSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && <p className="text-red-500">Erro ao buscar animes.</p>}

      {!isLoading && animes?.length === 0 && (
        <p className="text-gray-400 mt-6">Nenhum anime encontrado.</p>
      )}

      {!isLoading && animes?.length > 0 && (
        <div className="flex flex-col space-y-4 gap-2 ">
          <AnimatePresence>{renderedAnimes}</AnimatePresence>
        </div>
      )}
    </main>
  );
}
