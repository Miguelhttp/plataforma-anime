import { motion } from "framer-motion";
import { useState } from "react";
import imageProfile from "../../assets/profile.png";

const features = [
  {
    title: "Animes Populares",
    description: "Veja os animes mais populares do momento.",
  },
  {
    title: "Recomendações",
    description: "Sugestões personalizadas para você.",
  },
  {
    title: "Por Gênero",
    description: "Explore animes por gênero e categoria.",
  },
  {
    title: "Temporadas",
    description: "Animes da temporada atual sempre atualizados.",
  },
  {
    title: "Perfomance",
    description: "Desenvolvido com React, TailwindCSS e React Query.",
  }
];

const stack = [
  "Vite",
  "React",
  "TailwindCSS",
  "Tanstack React-Query",
  "Framer Motion",
  "Tanstack React-Router",
  "Zustand",
  "Clerk",
  "Swiper"
];

export default function About() {
  const [activeTab, setActiveTab] = useState("github");
  const scrollWidth = stack.length * 150; // largura aproximada de todos os cards juntos

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 py-16 max-w-5xl mx-auto text-white">
      {/* Projeto */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
          Sobre o Projeto
        </h1>
        <p className="text-gray-300 leading-relaxed mb-8">
          Plataforma de animes para explorar por gênero, ranking e temporada.
          Desenvolvido com React, TailwindCSS e React Query, focando em
          performance, responsividade e UX minimalista.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Autor */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-16"
      >
        <img
          src={imageProfile}
          alt="Miguel Braga"
          loading="lazy"
          className="w-36 h-44 rounded-full object-cover border-2 border-indigo-500"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">Miguel Braga</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Desenvolvedor Web focado em Front-end e mobile com React/React
            Native. Apaixonado por UX minimalista e soluções práticas.
          </p>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {["github", "linkedin"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-indigo-500 text-indigo-500 bg-gray-900"
                    : "border-transparent text-gray-400 hover:text-indigo-400 hover:border-gray-800"
                }`}
              >
                {tab === "github" ? "GitHub" : "LinkedIn"}
              </button>
            ))}
          </div>

          <div className="text-gray-300">
            {activeTab === "github" ? (
              <a
                href="https://github.com/Miguelhttp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Meu GitHub
              </a>
            ) : (
              <a
                href="https://www.linkedin.com/in/miguel-braga-48a339234/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Meu LinkedIn
              </a>
            )}
          </div>
        </div>
      </motion.section>

      {/* Stack do Projeto - Scroll Contínuo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 overflow-hidden w-full rounded-lg"
      >
        <h3 className="text-2xl font-semibold mb-6 text-indigo-400">
          Stack do Projeto
        </h3>

        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{ x: [-scrollWidth, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {stack.concat(stack).map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold text-center text-lg"
                style={{ minWidth: 140 }}
              >
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
