import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import LoadingSpinner from "../components/common/LoadingSpinner";

export const useThemeManager = () => {
  const { theme, toggleTheme, setTheme, isDark, setSystemDark } =
    useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);

      // Adicionar ao body também para maior compatibilidade
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
    }
  }, [theme, mounted]);

  // Detectar mudanças na preferência do sistema
  useEffect(() => {
    if (!mounted) {
      return (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size={32} color />
        </div>
      );
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Só muda automaticamente se não houver preferência salva
      const savedTheme = localStorage.getItem("theme-preference");

      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted, setTheme]);

  // Utilitários para classes CSS
  const getThemeClasses = (variant = "default") => {
    const variants = {
      default: {
        dark: "dark min-h-screen bg-gradient-to-b from-[#0D0D1C] to-[#15152B] text-white",
        light:
          "min-h-screen bg-gradient-to-br from-[#F5F8FF] from-10% via-[#eceeff] via-30% to-indigo-600 to-90% text-gray-900",
      },
      card: {
        dark: "bg-gray-800/50 border-gray-700 text-white backdrop-blur-sm",
        light: "bg-white/80 border-gray-200 text-gray-900 backdrop-blur-sm",
      },
      button: {
        dark: "bg-gray-700 hover:bg-gray-600 text-white border-gray-600",
        light: "bg-white hover:bg-gray-50 text-gray-900 border-gray-300",
      },
      input: {
        dark: "bg-gray-800 border-gray-600 text-white placeholder-gray-400",
        light: "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
      },
    };

    return variants[variant]?.[theme] || variants.default[theme];
  };

  return {
    theme,
    mounted,
    toggleTheme,
    setTheme,
    isDark: isDark(),
    getThemeClasses,
    setSystemDark,
  };
};
