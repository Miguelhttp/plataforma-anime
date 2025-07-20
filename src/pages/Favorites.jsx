import CardAnime from "../components/anime/CardAnime";
import WrapperPage from "../components/layout/WrapperPage";
import { useFavoritesStore } from "../store/favoritesStore";
import { useUser } from "@clerk/clerk-react";

export default function Favorites() {
  const { isSignedIn } = useUser();
  const favorites = useFavoritesStore((state) => state.favorites);

  if (!isSignedIn) {
    return (
      <WrapperPage>
        <div className="flex flex-col items-center justify-center h-screen mx-auto">
          <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
            Você precisa estar logado para ver seus animes favoritos
          </h1>
          <p className="text-gray-600 font-semibold mt-2 text-base text-center">
            Faça login ou crie uma conta para acessar seus favoritos.
          </p>
        </div>
      </WrapperPage>
    );
  }

  return (
    <WrapperPage>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-lg md:text-3xl text-center font-bold text-white">
            Você ainda não tem animes favoritos
          </h1>
        </div>
      ) : (
        <div className="px-6 py-24 max-w-5xl mx-auto">
          <h1 className="bg-gradient-to-r from-indigo-500 to-cyan-600 bg-clip-text text-transparent text-center text-2xl font-bold px-2 sm:px-4 mb-4">
            Meus Animes Favoritos
          </h1>
          <div className="flex flex-col gap-6">
            {favorites.map((anime) => (
              <CardAnime key={anime.mal_id} anime={anime} variant="list" />
            ))}
          </div>
        </div>
      )}
    </WrapperPage>
  );
}
