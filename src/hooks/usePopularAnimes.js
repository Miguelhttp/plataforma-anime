import { useQuery } from "@tanstack/react-query";
import { getPopularAnimes } from "../services/animes";

export const usePopularAnimes = () => {
  return useQuery({
    queryKey: ["popularAnimes"],
    queryFn: getPopularAnimes,
  })
}