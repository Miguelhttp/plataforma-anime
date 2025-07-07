import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRelatedAnime = (animeId) => {
  return useQuery({
    queryKey: ["relatedAnime", animeId],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
        );
        return data.data;
      } catch (error) {
        if (error.response?.status === 404) return []
        throw error
      }
    },
    enabled: !!animeId,
    retry: 2,
  });
};
