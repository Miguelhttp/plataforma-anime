import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CardAnime from "./CardAnime";
import CardAnimeSkeleton from "./CardAnimeSkeleton";

import "swiper/css";
import "swiper/css/navigation";

export default function AnimeSection({
  title,
  animes,
  isLoading,
  horizontal = false,
}) {
  // Remove animes duplicados
  // O método findIndex é usado para encontrar o índice do primeiro elemento que satisfaz a condição fornecida.
  // Se o índice do elemento atual for igual ao índice encontrado pelo findIndex, significa que o elemento é único.
  const animeUnique = animes?.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );

  return (
    <section className="space-y-4 px-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="px-2 sm:px-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
        {title}
      </h2>

      {isLoading ? (
        horizontal ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={28}
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
          {animeUnique?.map((anime) => (
            <SwiperSlide
              key={anime.mal_id}
              className="!h-auto !w-[140px] sm:!w-[160px] md:!w-[180px] px-1 sm:px-2 md:px-3"
            >
              <CardAnime anime={anime} variant="compact" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
          {animeUnique?.map((anime) => (
            <CardAnime key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </section>
  );
}
