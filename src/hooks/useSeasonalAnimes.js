import { useQuery } from "@tanstack/react-query";
import { getSeasonalAnimes } from "../services/animes.js";

/**
 *TODO Hook para buscar os animes da temporada atual.
 *TODO Usa cache e staleTime para otimizar chamadas à API do Jikan.
 */

export const useSeasonalAnimes = () => {
  return useQuery({
    queryKey: ["seasonalAnimes"],
    queryFn: getSeasonalAnimes,
    cacheTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};
