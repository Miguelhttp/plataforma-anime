import { useUser, SignOutButton } from "@clerk/clerk-react";
import { useFavoritesStore } from "../../store/favoritesStore";
import { motion } from "framer-motion";

export default function UserProfile() {
  const { user } = useUser();
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <motion.main 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
     className="max-w-4xl mx-auto p-6 mt-20 text-gray-900 dark:text-gray-100">
      <section className="flex flex-col items-center gap-4 bg-white dark:bg-[#121223] rounded-lg shadow-md p-8">
        {/* Avatar */}
        <img
          src={user.imageUrl || "/default-avatar.png"}
          alt={`${user.firstName} avatar`}
          className="w-28 h-28 rounded-full border-4 border-indigo-600"
        />

        {/* Nome e e-mail */}
        <h1 className="text-3xl font-bold">{user.fullName}</h1>
        <p className="text-indigo-400">
          {user.primaryEmailAddress.emailAddress}
        </p>
      </section>

      {/* Favoritos (exemplo básico) */}
      {favorites.length === 0 ? (
        <p className=" text-gray-500 dark:text-gray-400 text-center mt-8">
          Você ainda não adicionou nenhum anime aos favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-4">
          {favorites.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={anime.images?.jpg?.image_url ?? "/fallback-anime.jpg"}
                alt={anime.title}
                className="w-24 h-32 rounded-md object-cover"
              />
              <h3 className="mt-2 text-center font-semibold">{anime.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Botão logout */}
      <div className="mt-12 flex justify-center">
        <SignOutButton>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition">
            Sair da Conta
          </button>
        </SignOutButton>
      </div>
    </motion.main>
  );
}
