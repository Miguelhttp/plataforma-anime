import { motion } from "framer-motion";
import SungJinwooImg from "../../../../assets/characters/sung-jinwoo.webp";
import KiritoImg from "../../../../assets/characters/kirito.webp";
import ObitoImg from "../../../../assets/characters/obito.webp";

const characterCards = [
  {
    name: "Sung Jinwoo",
    image: SungJinwooImg,
    delay: 0,
  },
  {
    name: "Kirito",
    image: KiritoImg,
    delay: 0.2,
  },
  {
    name: "Obito",
    image: ObitoImg,
    delay: 0.4,
  },
];

export function CharactersCardAnime() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
      {characterCards.map((character, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: character.delay }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-48 h-64 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
          <p className="mt-2 text-white font-semibold text-center">{character.name}</p>
        </motion.div>
      ))}
    </div>
  );
}
