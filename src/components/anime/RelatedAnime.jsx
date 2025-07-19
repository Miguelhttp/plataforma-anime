import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRelatedAnime } from "../../hooks/useRelatedAnime";
import LoadingSpinner from "../common/LoadingSpinner";

import "swiper/css";
import "swiper/css/navigation";

import CardAnime from "../anime/CardAnime";
import CardAnimeSkeleton from "../anime/CardAnimeSkeleton";

const RelatedAnime = ({ animeId, animeTitle }) => {
  const { data: related, isLoading, isError } = useRelatedAnime(animeId);

  const shortTitle = useMemo(
    () =>
      animeTitle.length > 30 ? `${animeTitle.slice(0, 30)}...` : animeTitle,
    [animeTitle]
  );

  const relatedAnimes = useMemo(() => {
    return related?.map((rec) => rec.entry) ?? [];
  }, [related]);

  const renderedSlides = useMemo(() => {
    return relatedAnimes.map((anime) => (
      <SwiperSlide
        key={anime.mal_id}
        className="!w-[165px] sm:!w-[160px] md:!w-[180px] !h-auto px-1 sm:px-2 md:px-3"
      >
        <CardAnime anime={anime} variant="compact" />
      </SwiperSlide>
    ));
  }, [relatedAnimes]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <LoadingSpinner size={32} />
        <p className="font-semibold ml-2 text-gray-400">
          Carregando recomendações...
        </p>
      </div>
    );
  }

  if (isError || !related?.length) {
    return (
      <div className="mt-12 px-4 sm:px-6 md:px-8 lg:px-8">
        <p className="font-semibold text-red-500 text-center">
          Não foi possível carregar os animes relacionados. Tente novamente mais
          tarde.
        </p>
      </div>
    );
  }

  if (!relatedAnimes || relatedAnimes.length === 0) {
    return (
      <div className="mt-12 px-4 sm:px-6 md:px-8 lg:px-8">
        <h2 className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent text-2xl font-bold px-2 sm:px-4 mb-4">
          Não encontramos animes parecidos com {animeTitle}
        </h2>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-busy={isLoading}
      className="px-2 sm:px-6 lg:px-8 mt-12 space-y-4"
    >
      <h2 className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent text-2xl font-bold px-2 sm:px-4 mb-4">
        Animes parecidos com {shortTitle}
      </h2>

      <Swiper
        spaceBetween={44}
        modules={[Navigation]}
        navigation
        slidesPerView={"auto"}
        className="!pb-4 py-2"
      >
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <SwiperSlide
                key={index}
                className="!w-[180px] sm:!w-[160px] md:!w-[180px] !h-auto px-2 sm:px-2 md:px-3"
              >
                <CardAnimeSkeleton />
              </SwiperSlide>
            ))
          : renderedSlides}
      </Swiper>
    </motion.section>
  );
};

export default React.memo(RelatedAnime);
