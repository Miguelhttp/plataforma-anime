import { useMemo } from "react";

export function useAnimeSection(animes) {
  const animeUnique = useMemo(() => {
    if (!Array.isArray(animes)) return [];

    return animes?.filter(
      (anime, index, self) =>
        index === self.findIndex((a) => a.mal_id === anime.mal_id)
    );
  }, [animes])

  return {
    animeUnique,
  }
}