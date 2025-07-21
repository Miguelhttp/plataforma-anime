//! src/pages/Home/useHomeSections.js
import { useAnimesByGenre } from "../../hooks/useAnimesByGenre";
import { useRecommendedAnimes } from "../../hooks/useRecommendedAnimes";
import { useTopAnimes } from "../../hooks/useTopAnimes";

export function useHomeSections() {
  const topAnimes = useTopAnimes();
  const recommendedAnimes = useRecommendedAnimes();
  const adventureAnimes = useAnimesByGenre(2);
  const mysteryAnimes = useAnimesByGenre(7);

  //NOTE - sectionsData é um array de objetos que contém os dados das seções
  const sectionsData = [
    {
      title: "Top Animes",
      data: topAnimes.data,
      isLoading: topAnimes.isLoading,
    },
    {
      title: "Animes recomendados",
      data: recommendedAnimes.data,
      isLoading: recommendedAnimes.isLoading,
    },
    {
      title: "Aventura",
      data: adventureAnimes.data,
      isLoading: adventureAnimes.isLoading,
    },
    {
      title: "Misterio",
      data: mysteryAnimes.data,
      isLoading: mysteryAnimes.isLoading,
    },
  ];

  //NOTE - isLoading é um boolean que indica se alguma das seções está carregando
  const isLoading = sectionsData.some(({ isLoading }) => isLoading);

  return { sectionsData, isLoading };
}