import { useClerk, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { CharactersCardAnime } from "./_components/CharactersCardAnime";
import styles from "./styles/aurora.module.css";

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative bg-gradient-to-br from-[#0D0D1C] to-[#15152B] flex flex-col items-center justify-center h-screen px-6 text-center text-white overflow-hidden"
        >
          {/* Aurora Background */}
          <div className={`${styles.aurora} absolute inset-0 z-0`} />

          <CharactersCardAnime />

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
