import { useQuery } from "@tanstack/react-query";
import { getSeasonalAnimes } from "../services/animes.js";

export const useSeasonalAnimes = () => {
  return useQuery({
    queryKey: ["seasonalAnimes"],
    queryFn: getSeasonalAnimes,
    cacheTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}