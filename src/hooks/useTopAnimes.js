import { useQuery } from "@tanstack/react-query";
import { getPopularAnimes } from "../services/animes";

export function useTopAnimes() {
  return useQuery({
    queryKey: ["topAnimes"],
    queryFn: getPopularAnimes,
  });
}