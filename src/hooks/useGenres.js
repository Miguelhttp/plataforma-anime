import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../services/animes";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    onError: (error) => {
      console.log("Erro no useGenres", error);
    },
  });
}
