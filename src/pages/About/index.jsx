import { motion } from "framer-motion";
import CardProfile from "../../components/anime/CardProfile";
import imageProfile from "../../assets/profile.png"

export default function About() {
  return (
    <main className="px-4 py-28 max-w-4xl mx-auto dark:text-black space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-indigo-400">Sobre o AnimeHub</h1>

        <p className="text-lg leading-relaxed text-gray-700 font-semibold">
          O <strong>AnimeHub</strong> é uma plataforma desenvolvida com o
          objetivo de facilitar o acesso às informações sobre animes, tanto para
          iniciantes quanto para fãs experientes. Aqui você pode explorar
          lançamentos da temporada, ver trailers, conferir sinopses detalhadas,
          acompanhar rankings e buscar seus títulos favoritos com rapidez.
        </p>
      </motion.div>

      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="h-64 bg-gradient-to-br from-[#0D0D1C] via-[#15152B] to-[#1a1a2e] bg-[length:200%_200%] flex items-center justify-center px-4"
      >
        <CardProfile avatar={imageProfile} />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-3"
      >
        <h2 className="text-xl font-semibold text-indigo-400 mb-2">
          ✨ Funcionalidades
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>🔍 Buscar animes por nome</li>
          <li>🎬 Assistir trailers diretamente da plataforma</li>
          <li>📈 Ver os animes mais populares e melhor avaliados</li>
          <li>🧠 Explorar recomendações personalizadas</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-2"
      >
        <h2 className="text-xl font-semibold text-indigo-400 mb-2">
          🛠️ Tecnologias Utilizadas
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>React + Vite</li>
          <li>TanStack Router + React Query</li>
          <li>TailwindCSS</li>
          <li>Jikan API (MyAnimeList)</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-2"
      >
        <h2 className="text-xl font-semibold text-indigo-400 mb-2">
          👨‍💻 Sobre o Criador
        </h2>
        <p className="text-gray-700 font-semibold">
          Projeto desenvolvido por{" "}
          <strong>
            <a
              href="https://github.com/Miguelhttp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 underline"
            >
              Miguel Braga
            </a>
          </strong>
          , estudante de desenvolvimento web e apaixonado por animes. O AnimeHub
          foi criado como forma de praticar tecnologias modernas e unir
          conhecimento técnico com uma paixão pessoal.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="space-y-2"
      >
        <h2 className="text-xl font-semibold text-indigo-400 mb-2">
          📡 Fonte de Dados
        </h2>
        <p className="text-gray-700 font-semibold">
          Todos os dados da plataforma são fornecidos gratuitamente pela{" "}
          <a
            href="https://jikan.moe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 underline"
          >
            Jikan API
          </a>
          , uma interface pública e não-oficial da MyAnimeList.
        </p>
      </motion.section>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-sm text-gray-700 font-semibold pt-8 border-t border-gray-700"
      >
        © {new Date().getFullYear()} AnimeHub — Todos os direitos reservados.
      </motion.p>
    </main>
  );
}
