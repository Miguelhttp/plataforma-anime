import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export const getGenres = async () => {
  try {
    const response = await api.get("/genres/anime");
    console.log("Resposta da API:", response.data);
    return response.data.data || []
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return [];
  }
}

// Busca os animes por gênero
export const getAnimesByGenre = async (genreId, page = 1) => {
  const response = await api.get("/anime", {
    params: {
      genres: genreId,
      page,
      limit: 24, // Limite de animes por gênero
    },
  });
  return response.data.data || [];
};

// Input de busca de animes
export const searchAnimes = async (query) => {
  if (!query) return [];

  try {
    const response = await api.get("/anime", {
      params: {
        q: query,
        limit: 10, // Limite de resultados
      },
    });

    const qLower = query.toLowerCase();

    const filtered = response.data.data.filter((anime) => {
      const titlesToCheck = [
        anime.title,
        anime.title_english,
        anime.title_japanese,
        ...(anime.title_synonyms || []),
      ]
        .filter(Boolean) // remove nulls/undefined
        .map((t) => t.toLowerCase());

      // Verifica se algum título alternativo contém a query
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
  const response = await api.get("/seasons/now");
  return response.data.data;
};

// Busca os animes por ID (detalhes)
export const getAnimeById = async (id) => {
  const response = await api.get(`/anime/${id}`);
  return response.data.data;
};

// Busca os animes populares
export const getPopularAnimes = async () => {
  const response = await api.get("/top/anime");
  return response.data.data;
};

// Busca por recomendados
export const getRecommendedAnimes = async () => {
  const response = await api.get("/recommendations/anime");
  return response.data.data
    .map((item) => item.entry?.[0])
    .filter((anime) => anime?.images?.jpg?.image_url); // pega apenas os animes recomendados
};
