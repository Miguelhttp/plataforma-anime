import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";

import { useSeasonalAnimes } from "../../hooks/useSeasonalAnimes";
import CardAnime from "./CardAnime";
import CardAnimeSkeleton from "./CardAnimeSkeleton";

export function CarrosselSeasonal() {
  const { data: animes, isLoading } = useSeasonalAnimes();

  const animeUnique = useMemo(() => {
    return animes?.filter(
      (anime, index, self) =>
        index === self.findIndex((a) => a.mal_id === anime.mal_id)
    );
  }, [animes]);

  const renderedAnimeSlides = useMemo(() => {
    return animeUnique?.map((anime) => (
      <SwiperSlide
        key={anime.mal_id}
        className="!w-[140px] sm:!w-[160px] md:!w-[180px] !h-auto px-1 sm:px-2 md:px-3"
      >
        <CardAnime anime={anime} variant="compact" />
      </SwiperSlide>
    ));
  }, [animeUnique]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-busy={isLoading}
      className="px-4 sm:px-6 md:px-8 lg:px-8 space-y-4"
    >
      <h2 className="bg-gradient-to-r from-indigo-500 to-cyan-600 bg-clip-text text-transparent text-2xl font-bold px-2 sm:px-4 mb-4">
        Lançamentos Novos
      </h2>

      <Swiper
        spaceBetween={26}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={"auto"}
        className="!pb-4 py-2"
      >
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <SwiperSlide
                key={index}
                className="!w-[140px] sm:!w-[160px] md:!w-[180px] !h-auto px-1 sm:px-2 md:px-3"
              >
                <CardAnimeSkeleton />
              </SwiperSlide>
            ))
          :  renderedAnimeSlides }
      </Swiper>
    </motion.section>
  );
}
