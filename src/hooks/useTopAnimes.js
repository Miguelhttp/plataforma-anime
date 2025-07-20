import { useQuery } from "@tanstack/react-query";
import { getPopularAnimes } from "../services/animes";

export function useTopAnimes() {
  return useQuery({
    queryKey: ["topAnimes"],
    queryFn: getPopularAnimes,
    staleTime: 1000 * 60 * 5, // 1 hora
    cacheTime: 1000 * 60 * 10, // 1 hora
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
