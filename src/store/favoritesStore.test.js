import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFavoritesStore } from "../store/favoritesStore";

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe("FavoritesStore", () => {
  beforeEach(() => {
    // Limpa o store antes de cada teste
    useFavoritesStore.getState().clearFavorites();
    useFavoritesStore.getState().setUserId(null);
    vi.clearAllMocks();
  });

  const mockAnime = {
    mal_id: 1,
    title: "Test Anime",
    images: {
      webp: { image_url: "test-image.jpg" },
    },
  };

  describe("User Management", () => {
    it("deve definir userId corretamente", () => {
      const { setUserId } = useFavoritesStore.getState();

      setUserId("user123");

      expect(useFavoritesStore.getState().userId).toBe("user123");
    });

    it("deve limpar favoritos ao trocar usuário", () => {
      const { setUserId, addFavorite } = useFavoritesStore.getState();

      // Usuário 1 adiciona favorito
      setUserId("user1");
      addFavorite(mockAnime);
      expect(useFavoritesStore.getState().favorites).toHaveLength(1);

      // Troca para usuário 2
      setUserId("user2");
      expect(useFavoritesStore.getState().favorites).toHaveLength(0);
    });
  });

  describe("Favorites Management", () => {
    beforeEach(() => {
      useFavoritesStore.getState().setUserId("user123");
    });

    it("deve adicionar anime aos favoritos", () => {
      const { addFavorite } = useFavoritesStore.getState();

      addFavorite(mockAnime);

      const { favorites } = useFavoritesStore.getState();
      expect(favorites).toHaveLength(1);
      expect(favorites[0]).toEqual(mockAnime);
    });

    it("não deve adicionar anime duplicado", () => {
      const { addFavorite } = useFavoritesStore.getState();

      addFavorite(mockAnime);
      addFavorite(mockAnime); // Tentar adicionar novamente

      expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    });

    it("deve remover anime dos favoritos", () => {
      const { addFavorite, removeFavorite } = useFavoritesStore.getState();

      addFavorite(mockAnime);
      removeFavorite(mockAnime.mal_id);

      expect(useFavoritesStore.getState().favorites).toHaveLength(0);
    });

    it("deve verificar se anime é favorito", () => {
      const { addFavorite, isFavorite } = useFavoritesStore.getState();

      expect(isFavorite(mockAnime.mal_id)).toBe(false);

      addFavorite(mockAnime);
      expect(isFavorite(mockAnime.mal_id)).toBe(true);
    });

    it("não deve adicionar favorito se usuário não estiver logado", () => {
      // Simula usuário não logado
      useFavoritesStore.getState().setUserId(null);

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { addFavorite } = useFavoritesStore.getState();

      addFavorite(mockAnime);

      expect(useFavoritesStore.getState().favorites).toHaveLength(0);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Usuário não logado, não pode adicionar favoritos"
      );

      consoleSpy.mockRestore();
    });
  });
});
