import { useQuery } from "@tanstack/react-query";
import { getAnimesByGenre } from "../services/animes";

export function useAnimesByGenre(genreId) {
  return useQuery({
    queryKey: ["animesByGenre", genreId],
    queryFn: () => getAnimesByGenre(genreId),
    enabled: !!genreId,
    staleTime: 0,
    refetchOnMount: true,
    retry: 1,
  });
}
