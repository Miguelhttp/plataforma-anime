import AnimeSection from "../../components/anime/AnimeSection";
import { CarrosselSeasonal } from "../../components/anime/ui/CarrosselSeasonal";

import { HeroBanner } from "../../components/common/HeroBanner";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { useHomeSections } from "./useHomeSections";

export default function Home() {
  //NOTE - useHomeSections é um hook personalizado que retorna os dados das seções
  const { sectionsData, isLoading } = useHomeSections();
  
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
