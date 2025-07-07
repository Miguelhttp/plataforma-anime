import { Link } from "@tanstack/react-router";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTopAnimes } from "../../hooks/useTopAnimes";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroBanner = () => {
  const { data, isLoading, isError, error } = useTopAnimes();

  // Verifica se o anime em destaque foi carregado com sucesso
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={32} color="text-red-500" />
      </div>
    );
  }

  // Exibe uma mensagem de erro em caso de falha na busca
  if (isError || !data || data.length === 0) {
    return (
      <div className="w-full h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center bg-red-900 text-white rounded-lg shadow-lg">
        <p>
          Ocorreu um erro ao carregar o banners:{" "}
          {error?.message || "Erro desconhecido"}
        </p>
      </div>
    );
  }

  const featuredAnime = data.slice(0, 5);

  return (
    <div className="h-96 md:h-[500px] lg:h-[650px] rounded-lg overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        effect="fade"
        className="h-full w-full"
      >
        {featuredAnime.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
            <div
              className="relative w-full h-full bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${anime.images?.webp?.large_image_url})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-16 text-white"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                  {anime.title}
                </h1>

                <p className="text-base text-gray-400 md:text-lg lg:text-xl mb-6 max-w-2xl drop-shadow-md line-clamp-3">
                  {anime.synopsis || "Nenhuma descrição disponível"}
                </p>

                <div>
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(HeroBanner);
