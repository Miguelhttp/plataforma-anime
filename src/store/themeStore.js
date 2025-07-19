import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark", // Default theme
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      // Adicionar método para definir tema específico
      setTheme: (newTheme) => set({ theme: newTheme }),

      // Getter para verificar se o tema é dark
      isDark: () => get().theme === "dark",

      // Método para detectar preferência do sistema
      setSystemTheme: () => {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        set({ theme: prefersDark ? "dark" : "light" });
      },
    }),
    {
      name: "theme-preference", // Unique name for the storage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
