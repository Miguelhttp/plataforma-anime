import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      userId: null,  // id do usuário atual
      favorites: [],
      setUserId: (id) =>
        set((state) => {
          // Se mudou o userId, limpa favoritos para o novo usuário
          if (state.userId !== id) {
            return { userId: id, favorites: [] };
          }
          return { userId: id };
        }),
      addFavorite: (anime) => {
        if (!get().userId) {
          console.warn("Usuário não logado, não pode adicionar favoritos");
          return;
        }
        const exists = get().favorites.some((fav) => fav.mal_id === anime.mal_id);
        if (!exists) {
          set((state) => ({ favorites: [...state.favorites, anime] }));
        }
      },
      removeFavorite: (mal_id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.mal_id !== mal_id),
        }));
      },
      isFavorite: (mal_id) => get().favorites.some((fav) => fav.mal_id === mal_id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
      getStorage: () => localStorage,
    }
  )
);
