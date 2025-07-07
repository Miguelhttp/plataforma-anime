import { create } from 'zustand';

export const useAnimeStore = create((set) => ({
  genreId: null,
  setGenreId: (id) => set({ genreId: id }),
}))