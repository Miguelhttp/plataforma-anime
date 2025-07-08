import { Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export default function AnimatedRoutes() {
  const locationKey = useRouterState({ select: (state) => state.location.key });

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size={32} color />
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
  );
}
