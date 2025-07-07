import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark', // Default theme
      toggleTheme: () => 
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        }))
    }),
    {
      name: 'theme-preference', // Unique name for the storage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
)