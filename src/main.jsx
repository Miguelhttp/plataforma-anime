import { ClerkProvider, useUser } from "@clerk/clerk-react";
import { dark, neobrutalism } from "@clerk/themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router.jsx";
import queryClient from "./services/queryClient.js";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";

import { useThemeStore } from "./store/themeStore.js";
import { useFavoritesStore } from "./store/favoritesStore";

const initialTheme = localStorage.getItem("theme") || "light";
document.documentElement.classList.add(initialTheme);

// Aplica a classe `dark` no HTML baseado na store
function ThemeWrapper({ children }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return children;
}

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// componente que sincroniza userId da Clerk com a store
function SyncUserIdProvider({ children }) {
  const { user, isLoaded } = useUser();
  const setUserId = useFavoritesStore((state) => state.setUserId);

  useEffect(() => {
    if (isLoaded) {
      setUserId(user?.id ?? null);
    }
  }, [user, isLoaded, setUserId]);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      appearance={{ baseTheme: dark, signIn: { baseTheme: dark } }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <SyncUserIdProvider>
            <RouterProvider router={router} />
          </SyncUserIdProvider>
        </ThemeWrapper>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
