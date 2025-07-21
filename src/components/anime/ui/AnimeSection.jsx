import { lazy, Suspense, useMemo } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CardAnimeSkeleton from "../CardAnimeSkeleton";
import { useAnimeSection } from "../logic/useAnimeSection";

import "swiper/css";
import "swiper/css/navigation";

const CardAnime = lazy(() => import("../CardAnime"));

export default function AnimeSection({
  title,
  animes,
  isLoading,
  horizontal = false,
}) {
  const { animeUnique } = useAnimeSection(animes);

  //NOTE -> useMemo -> renderização de componentes
  //NOTE -> A função useMemo é usada para armazenar o resultado de uma função que é computacionalmente cara.
  const renderedAnimesCards = useMemo(() => {
    return animeUnique.map((anime) => (
      <Suspense key={anime.mal_id} fallback={<CardAnimeSkeleton />}>
        <CardAnime key={anime.mal_id} anime={anime} />
      </Suspense>
    ));
  }, [animeUnique]);

  const renderedAnimeSlides = useMemo(() => {
    return animeUnique.map((anime) => (
      <SwiperSlide
        key={anime.mal_id}
        className="!h-auto !w-[180px] sm:!w-[160px] md:!w-[180px] px-1 sm:px-2 md:px-3"
      >
        <Suspense fallback={<CardAnimeSkeleton />}>
          <CardAnime anime={anime} variant="compact" />
        </Suspense>
      </SwiperSlide>
    ));
  }, [animeUnique]);

  return (
    <section className="space-y-4 px-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="px-2 sm:px-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
        {title}
      </h2>

      {isLoading ? (
        horizontal ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={26}
            slidesPerView={"auto"}
            navigation
            className="!pb-4"
          >
            {[...Array(6)].map((_, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <CardAnimeSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <CardAnimeSkeleton key={index} />
            ))}
          </div>
        )
      ) : horizontal ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={26}
          slidesPerView={"auto"}
          navigation
          className="!pb-4"
        >
          {renderedAnimeSlides}
        </Swiper>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
          {renderedAnimesCards}
        </div>
      )}
    </section>
  );
}
