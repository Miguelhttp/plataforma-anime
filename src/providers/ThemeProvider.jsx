import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

const initialTheme = localStorage.getItem("theme") || "light";
document.documentElement.classList.add(initialTheme);

export function ThemeProvider({ children }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return children;
}