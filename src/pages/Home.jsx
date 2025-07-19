import AnimeSection from "../components/anime/AnimeSection";
import { CarrosselSeasonal } from "../components/anime/CarrosselSeasonal";

import { useAnimesByGenre } from "../hooks/useAnimesByGenre";
import { useRecommendedAnimes } from "../hooks/useRecommendedAnimes";
import { useTopAnimes } from "../hooks/useTopAnimes";

import { HeroBanner } from "../components/common/HeroBanner";
import LoadingSpinner from "../components/common/LoadingSpinner";

const SECTIONS = [
  { title: "Top Animes", hook: useTopAnimes },
  { title: "Animes recomendados", hook: useRecommendedAnimes },
  { title: "Aventura", hook: () => useAnimesByGenre(2) },
  { title: "Misterio", hook: () => useAnimesByGenre(7) },
];

export default function Home() {
  // Usar o hook para cada seção e armazenar os dados em um array
  const sectionsData = SECTIONS.map(({ title, hook }) => {
    const { data, isLoading } = hook();
    return { title, data, isLoading };
  });

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
