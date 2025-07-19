import { useQuery } from "@tanstack/react-query";
import { getAnimesByGenre } from "../services/animes";

export function useAnimesByGenre(genreId) {
  return useQuery({
    queryKey: ["animesByGenre", genreId],
    queryFn: () => getAnimesByGenre(genreId),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
