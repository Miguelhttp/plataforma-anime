import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export const getGenres = async () => {
  try {
    const { data } = await api.get("/genres/anime");
    console.log("Resposta da API:", data);
    return data.data ?? [];
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return [];
  }
}

// Busca os animes por gênero
export const getAnimesByGenre = async (genreId, page = 1) => {
  try {
    const { data } = await api.get("/anime", {
      params: {
        genres: genreId,
        page,
        limit: 24,
      },
    });
    return data.data ?? [];
  } catch (error) {
    console.error("Erro ao buscar animes por gênero:", error);
    return [];
  }
};

// Input de busca de animes
export const searchAnimes = async (query) => {
  if (!query) return [];

  try {
    const { data } = await api.get("/anime", {
      params: {
        q: query,
        limit: 10,
      },
    });

    const qLower = query.toLowerCase();

    const filtered = (data.data ?? []).filter((anime) => {
      const titlesToCheck = [
        anime.title,
        anime.title_english,
        anime.title_japanese,
        ...(anime.title_synonyms || []),
      ]
        .filter(Boolean)
        .map((t) => t.toLowerCase());

      return titlesToCheck.some((title) => title.includes(qLower));
    });

    return filtered;
  } catch (error) {
    console.error("Erro ao buscar animes:", error);
    return [];
  }
};

// Busca os animes da temporada atual
export const getSeasonalAnimes = async () => {
  try {
    const { data } = await api.get("/seasons/now");
    return data.data ?? [];
  } catch (error) {
    console.error("Erro ao buscar animes sazonais:", error);
    return [];
  }
};

// Busca os animes por ID (detalhes)
export const getAnimeById = async (id) => {
  try {
    const { data } = await api.get(`/anime/${id}`);
    return data.data ?? null;
  } catch (error) {
    console.error(`Erro ao buscar anime com id ${id}:`, error);
    return null;
  }
};

// Busca os animes populares
export const getPopularAnimes = async () => {
  try {
    const { data } = await api.get("/top/anime");
    return data.data ?? [];
  } catch (error) {
    console.error("Erro ao buscar animes populares:", error);
    return [];
  }
};

// Busca por recomendados
export const getRecommendedAnimes = async () => {
  try {
    const { data } = await api.get("/recommendations/anime");
    return (data.data ?? [])
      .map((item) => item.entry?.[0])
      .filter((anime) => anime?.images?.jpg?.image_url);
  } catch (error) {
    console.error("Erro ao buscar animes recomendados:", error);
    return [];
  }
};
