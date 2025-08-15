//! src/pages/Home/useHomeSections.js
import { useAnimesByGenre } from "../../hooks/useAnimesByGenre";
import { useRecommendedAnimes } from "../../hooks/useRecommendedAnimes";
import { useTopAnimes } from "../../hooks/useTopAnimes";

export function useHomeSections() {
  const topAnimes = useTopAnimes();
  const recommendedAnimes = useRecommendedAnimes();
  const schoolLife = useAnimesByGenre(23);

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
      title: "School Life",
      data: schoolLife.data,
      isLoading: schoolLife.isLoading,
    },
  ];

  //NOTE - isLoading é um boolean que indica se alguma das seções está carregando
  const isLoading = sectionsData.some(({ isLoading }) => isLoading);

  return { sectionsData, isLoading };
}
