import AnimeSection from "../components/anime/AnimeSection";
import { CarrosselSeasonal } from "../components/anime/CarrosselSeasonal";

import { useAnimesByGenre } from "../hooks/useAnimesByGenre";
import { useRecommendedAnimes } from "../hooks/useRecommendedAnimes";
import { useTopAnimes } from "../hooks/useTopAnimes";

import { HeroBanner } from "../components/common/HeroBanner";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Home() {
  // Usar o hook para cada seção e armazenar os dados em um array
  const topAnimes = useTopAnimes();
  const recommendedAnimes = useRecommendedAnimes();
  const adventureAnimes = useAnimesByGenre(2);
  const mysteryAnimes = useAnimesByGenre(7);

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

  // Verifica se algum dos hooks está carregando
  const isLoading = sectionsData.some(({ isLoading }) => isLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={32} color />
      </div>
    );
  }

  return (
    <main className="space-y-12 py-14 px-4 sm:px-6 md:px-8">
      <section className="px-4 sm:px-6 md:px-8">
        <HeroBanner />
      </section>

      <section>
        <CarrosselSeasonal />
      </section>

      <section className="space-y-12">
        {sectionsData.map(({ title, data, isLoading }) => (
          <AnimeSection
            key={title}
            title={title}
            animes={data}
            isLoading={isLoading}
            horizontal
          />
        ))}
      </section>
    </main>
  );
}
