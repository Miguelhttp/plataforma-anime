import { motion } from "framer-motion";
import bannerMobileImage from "../../assets/banner-mobile.webp";
import bannerImage from "../../assets/banner.webp";

export function HeroBanner() {
  return (
    <div className="relative h-96 md:h-[500px] lg:h-[650px] w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-700">
      {/* Imagem para desktop (md e acima) */}
      <motion.img
        src={bannerImage}
        alt="Sung Jinwoo"
        loading="lazy"
        className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Imagem para mobile (abaixo de md) */}
      <motion.img
        src={bannerMobileImage}
        alt="Sung Jinwoo Mobile"
        className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 h-full flex flex-col justify-center items-start p-6 md:p-12 text-white"
      >
        <h1 className="hidden md:block text-4xl md:text-5xl font-bold drop-shadow-xl mb-4 bg-gradient-to-r from-gray-200 to-purple-600 bg-clip-text text-transparent">
          Eleve-se com Sung Jin-Woo
        </h1>

        <p className="hidden md:block text-lg md:text-xl text-gray-300 max-w-2xl drop-shadow-md mb-6">
          Acompanhe a jornada do caçador mais forte em Solo Leveling e mergulhe
          em batalhas intensas e evolução constante.
        </p>
      </motion.div>
    </div>
  );
}
