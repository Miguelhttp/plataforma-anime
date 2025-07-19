import { useParams } from "@tanstack/react-router";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAnimeById } from "../hooks/useAnimeById";

import RelatedAnime from "../components/anime/RelatedAnime";

export default function AnimeDetails() {
  const { id } = useParams({ from: "/anime/$id"});
  const { data: anime, isLoading, isError } = useAnimeById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center h-60">
        <LoadingSpinner size={32} />
        <p className="text-white animate-pulse">
          Carregando detalhes do anime...
        </p>
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-red-500">Erro ao carregar detalhes do anime.</p>
      </div>
    );
  }

  function handleImageError(e) {
    e.currentTarget.src = "/image-error.png";
  }

  return (
    <section className="py-20 px-4 max-w-6xl min-h-screen mx-auto  text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="shrink-0 w-full md:w-64 rounded-xl shadow-lg overflow-hidden bg-transparent">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="md:w-full  h-full sm:object-contain mx-auto"
            loading="lazy"
            onError={handleImageError} // Fallback image
          />
        </div>

        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl text-gray-600 text-center font-bold mb-2">{anime.title}</h1>
          <p className="text-gray-300 italic text-sm mb-4">
            {anime.title_japanese}
          </p>

          <div className="text-sm text-gray-400 space-y-1 mb-6">
            <p>
              <strong>Status:</strong> {anime.status}
            </p>
            <p>
              <strong>Episódios:</strong> {anime.episodes}
            </p>
            <p>
              <strong>Duração:</strong> {anime.duration}
            </p>
            <p>
              <strong>Nota:</strong> {anime.score || "N/A"}
            </p>
            <p>
              <strong>Gêneros:</strong>{" "}
              {anime.genres.map((g) => g.name).join(", ")}
            </p>
          </div>

          {/* Sinopse com altura limitada e scroll se for longa */}
          <div
            className="text-gray-600 font-semibold text-base leading-relaxed mb-4 max-h-48 overflow-y-auto pr-2"
            style={{ scrollbarWidth: "thin" }}
          >
            {anime.synopsis || "Sinopse indisponível."}
          </div>
        </div>
      </div>

      {anime.trailer?.embed_url && (
        <div className="mt-12">
          <h2 className="text-2xl text-gray-600 font-semibold mb-2">Trailer</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-full">
            <iframe
              src={anime.trailer.embed_url}
              allowFullScreen
              className="w-full rounded-xl aspect-video"
              title={`Trailer de ${anime.title}`}
            />
          </div>
        </div>
      )}

      <RelatedAnime animeId={anime.mal_id} animeTitle={anime.title} />
    </section>
  );
}
