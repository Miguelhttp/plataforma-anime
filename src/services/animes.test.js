import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock do axios com factory function para evitar problemas de hoisting
vi.mock("axios", () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
  };
});

// Agora importa os services DEPOIS do mock
import {
  searchAnimes,
  getAnimeById,
  getGenres,
  getSeasonalAnimes,
  getPopularAnimes,
  getRecommendedAnimes,
  getAnimesByGenre,
} from "../services/animes";

// Importa axios para obter a instância mockada
import axios from "axios";
const mockAxiosInstance = axios.create();

describe("Anime Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("searchAnimes", () => {
    it("deve retornar array vazio para query vazia", async () => {
      const result = await searchAnimes("");
      expect(result).toEqual([]);
    });

    it("deve retornar animes filtrados para query válida", async () => {
      const mockResponse = {
        data: {
          data: [
            {
              mal_id: 1,
              title: "Naruto",
              title_english: "Naruto",
              images: { webp: { image_url: "naruto.jpg" } },
            },
            {
              mal_id: 2,
              title: "One Piece",
              title_english: "One Piece",
              images: { webp: { image_url: "onepiece.jpg" } },
            },
          ],
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await searchAnimes("naruto");

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/anime", {
        params: { q: "naruto", limit: 10 },
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Naruto");
    });

    it("deve tratar erro e retornar array vazio", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("Network error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await searchAnimes("test");

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao buscar animes:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("getAnimeById", () => {
    it("deve retornar anime para ID válido", async () => {
      const mockAnime = {
        mal_id: 1,
        title: "Test Anime",
        synopsis: "Test synopsis",
      };

      const mockResponse = { data: { data: mockAnime } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await getAnimeById(1);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/anime/1");
      expect(result).toEqual(mockAnime);
    });

    it("deve retornar null para erro na API", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("Not found"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getAnimeById(999);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao buscar anime com id 999:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("getGenres", () => {
    it("deve retornar lista de gêneros", async () => {
      const mockGenres = [
        { mal_id: 1, name: "Action" },
        { mal_id: 2, name: "Adventure" },
      ];

      const mockResponse = { data: { data: mockGenres } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await getGenres();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/genres/anime");
      expect(result).toEqual(mockGenres);
    });

    it("deve retornar array vazio em caso de erro", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("API Error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getGenres();

      expect(result).toEqual([]);

      consoleSpy.mockRestore();
    });
  });

  describe("getSeasonalAnimes", () => {
    it("deve retornar animes da temporada com timeout", async () => {
      const mockAnimes = [
        { mal_id: 1, title: "Seasonal Anime 1" },
        { mal_id: 2, title: "Seasonal Anime 2" },
      ];

      const mockResponse = { data: { data: mockAnimes } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await getSeasonalAnimes();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/seasons/now", {
        timeout: 5000,
      });
      expect(result).toEqual(mockAnimes);
    });

    it("deve retornar array vazio em caso de timeout", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("Timeout"));

      const result = await getSeasonalAnimes();

      expect(result).toEqual([]);
    });
  });

  describe("getPopularAnimes", () => {
    it("deve retornar lista de animes populares", async () => {
      const mockAnimes = [
        { mal_id: 1, title: "Popular Anime 1", score: 9.0 },
        { mal_id: 2, title: "Popular Anime 2", score: 8.5 },
      ];

      const mockResponse = { data: { data: mockAnimes } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await getPopularAnimes();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/top/anime");
      expect(result).toEqual(mockAnimes);
    });

    it("deve retornar array vazio em caso de erro", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("API Error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getPopularAnimes();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao buscar animes populares:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("getRecommendedAnimes", () => {
    it("deve retornar lista de animes recomendados processados", async () => {
      const mockApiResponse = {
        data: {
          data: [
            {
              entry: [
                {
                  mal_id: 1,
                  title: "Recommended Anime 1",
                  images: { jpg: { image_url: "image1.jpg" } },
                },
              ],
            },
            {
              entry: [
                {
                  mal_id: 2,
                  title: "Recommended Anime 2",
                  images: { jpg: { image_url: "image2.jpg" } },
                },
              ],
            },
            {
              entry: [
                {
                  mal_id: 3,
                  title: "Anime Without Image",
                  // Sem imagem - deve ser filtrado
                },
              ],
            },
          ],
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockApiResponse);

      const result = await getRecommendedAnimes();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "/recommendations/anime"
      );
      expect(result).toHaveLength(2); // Terceiro item filtrado por não ter imagem
      expect(result[0].title).toBe("Recommended Anime 1");
      expect(result[1].title).toBe("Recommended Anime 2");
    });

    it("deve retornar array vazio em caso de erro", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("API Error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getRecommendedAnimes();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao buscar animes recomendados:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("getAnimesByGenre", () => {
    it("deve retornar animes filtrados por gênero", async () => {
      const mockAnimes = [
        { mal_id: 1, title: "Action Anime 1", genres: [{ name: "Action" }] },
        { mal_id: 2, title: "Action Anime 2", genres: [{ name: "Action" }] },
      ];

      const mockResponse = { data: { data: mockAnimes } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await getAnimesByGenre(1, 1);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/anime", {
        params: {
          genres: 1,
          page: 1,
          limit: 24,
        },
      });
      expect(result).toEqual(mockAnimes);
    });

    it("deve usar parâmetros padrão quando page não for fornecida", async () => {
      const mockResponse = { data: { data: [] } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await getAnimesByGenre(2);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/anime", {
        params: {
          genres: 2,
          page: 1, // Valor padrão
          limit: 24,
        },
      });
    });

    it("deve retornar array vazio em caso de erro", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("Genre Error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getAnimesByGenre(1);

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao buscar animes por gênero:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
