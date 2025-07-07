import { Outlet, useRouterState } from "@tanstack/react-router";
import { Suspense, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify"; // IMPORT

import ErrorBoundary from "./components/common/ErrorBoundary";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);
  const locationKey = useRouterState({ select: (state) => state.location.key });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={
        theme === "dark"
          ? "dark min-h-screen bg-gradient-to-b from-[#0D0D1C] to-[#15152B]"
          : "min-h-screen bg-gradient-to-br from-[#F5F8FF] from-10% via-[#eceeff] via-30% to-indigo-600 to-90%"
      }
    >
      <Header />

      <ErrorBoundary>
        <Suspense
          fallback={
            <div
              aria-live="polite"
              className="flex items-center justify-center h-screen"
            >
              <LoadingSpinner size={32} color />
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={locationKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[calc(100vh-6rem)]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </ErrorBoundary>

      <Footer />

      {/* ToastContainer precisa ficar dentro do App para funcionar globalmente */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme} // usa tema dark/light da sua store
      />
    </div>
  );
}
