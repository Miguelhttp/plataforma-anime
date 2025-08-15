import { useQuery } from "@tanstack/react-query";
import { getPopularAnimes } from "../services/animes";

export function useTopAnimes() {
  return useQuery({
    queryKey: ["topAnimes"],
    queryFn: getPopularAnimes,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 0,
    refetchOnMount: true,
  });
}
