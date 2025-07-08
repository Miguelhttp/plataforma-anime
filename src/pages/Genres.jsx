import { useParams } from "@tanstack/react-router";
import CardAnime from "../components/anime/CardAnime";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAnimesByGenre } from "../hooks/useAnimesByGenre"; // hook que chama getAnimesByGenre
import { useGenres } from "../hooks/useGenres";

export default function Genres() {
  const { genreId } = useParams({ from: "/genres/$genreId" });
  const genreIdNumber = Number(genreId);

  const { data: genres = [] } = useGenres();
  const { data: animes, isLoading, isError } = useAnimesByGenre(genreIdNumber);

  // Buscar por nome do gênero pelo ID
  const genreName =
    genres.find((genre) => genre.mal_id === genreIdNumber)?.name || "Gênero";

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={32} />
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Erro ao carregar animes do gênero.
      </p>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Animes do Gênero {genreName}</h1>

      {/* Lista de animes */}
      {animes.length === 0 ? (
        <p className="text-center">Nenhum anime encontrado para este gênero.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {animes.map((anime) => (
            <CardAnime key={anime.mal_id} anime={anime} variant="list" />
          ))}
        </div>
      )}
    </section>
  );
}
