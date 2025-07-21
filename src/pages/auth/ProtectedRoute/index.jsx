import { useClerk, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import styles from "./styles/aurora.module.css";

// Imagens dos personagens 3D
import kirito from "../../../assets/characters/kirito.webp";
import obito from "../../../assets/characters/obito.webp";
import sungJinwoo from "../../../assets/characters/sung-jinwoo.webp";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={32} color />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-[#0D0D1C] to-[#15152B] flex flex-col items-center justify-center h-screen px-6 text-center text-white overflow-hidden"
        >
          {/* Aurora Background */}
          <div className={`${styles.aurora} absolute inset-0 z-0`} />

          {/* Cards flutuantes dos personagens */}
          <div className="flex gap-6 mb-10">
            {[
              { img: sungJinwoo, name: "Sung Jinwoo" },
              { img: kirito, name: "Kirito" },
              { img: obito, name: "Obito" },
            ].map(({ img, name, desc }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: 0.5 }}
                className="w-36 h-48 bg-gradient-to-tr from-purple-700/40 to-indigo-600/30 rounded-xl shadow-lg backdrop-blur-sm p-2 border border-purple-500/30"
              >
                <div className="group relative w-full h-full p-2 flex flex-col items-center justify-center">
                  <img
                    src={img}
                    alt={name}
                    className="object-contain w-full h-32 transition-transform duration-300 ease-out group-hover:scale-125"
                  />
                  <p className="text-sm text-center font-semibold mt-2 text-gray-300">
                    {name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            transition={{ delay: 0.3, duration: 3, ease: "easeInOut" }}
            className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-gray-200 to-purple-600 bg-clip-text text-transparent"
          >
            Bem-vindo à Plataforma AnimeHub!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 text-lg max-w-md text-gray-400"
          >
            Para continuar, faça login ou crie uma conta para aproveitar todos
            os recursos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex gap-6"
          >
            <button
              onClick={() => redirectToSignIn()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded font-semibold transition"
            >
              Fazer login
            </button>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return children;
}
