//!! src/components/anime/logic/useCarrosselSeasonal.js
import { useMemo } from "react";
import { useSeasonalAnimes } from "../../../hooks/useSeasonalAnimes";

export const useCarrosselSeasonal = () => {
  const { data: animes, isLoading } = useSeasonalAnimes();

  const animeUnique = useMemo(() => {
    //NOTE -> Verifica se é um array
    if (!Array.isArray(animes)) return [];

    //NOTE -> Remove animes repetidos
    return animes?.filter(
      (anime, index, self) =>
        index === self.findIndex((a) => a.mal_id === anime.mal_id)
    );
  }, [animes]);

  return { animes: animeUnique, isLoading };
}