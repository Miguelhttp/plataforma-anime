import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import ImageError from "../../assets/image-error.png";

export default function ErrorPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-screen h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex flex-col justify-center items-center text-white px-4"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-7xl font-extrabold mb-2"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-2xl font-semibold mb-2"
      >
        Página não encontrada
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center text-gray-300 max-w-md mb-6"
      >
        Você vagou por terras desconhecidas... Mas não se preocupe, há um
        caminho de volta ao lar.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          to="/"
          className="bg-pink-600 hover:bg-pink-700 transition-colors px-6 py-3 rounded-lg font-medium text-white shadow-md"
        >
          Voltar para o início
        </Link>
      </motion.div>

      <motion.img
        src={ImageError}
        alt="Naruto triste"
        className="w-56 mt-10 opacity-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.div>
  );
}
