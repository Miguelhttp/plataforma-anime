import { useQuery } from "@tanstack/react-query";
import { getRecommendedAnimes } from "../services/animes";

export const useRecommendedAnimes = () => {
  return useQuery({
    queryKey: ["recommendedAnimes"],
    queryFn: getRecommendedAnimes,
    staleTime: 0,
    refetchOnMount: true,
    retry: 1,
  });
};
