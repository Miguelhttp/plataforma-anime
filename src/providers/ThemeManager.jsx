import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";

export const useThemeManager = () => {
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme, mounted]);

  return { theme, mounted };
};