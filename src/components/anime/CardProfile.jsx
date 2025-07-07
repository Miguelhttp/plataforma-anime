import { motion } from "framer-motion";

export default function CardProfile({ name = "Miguel Braga", message = "Bem-vindo ao AnimeHub!", sub = "O mundo dos animes na sua mão.", avatar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-[#1e1e2e]/80 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-sm w-full text-white border border-[#2e2e48]"
    >
      <div className="flex items-center gap-4">
        <img
          src={avatar ?? "/fallback-anime.jpg"}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-base font-bold text-white">{message}</p>
          <p className="text-xs text-gray-300">{sub}</p>
        </div>
      </div>
    </motion.div>
  );
}
