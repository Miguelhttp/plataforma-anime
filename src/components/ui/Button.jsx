import React, { useCallback, useOptimistic } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Hourglass, LogOut } from "lucide-react";

export const Button = React.memo(function Button({
  variant = "login",
  onClick,
}) {
  const [loading, setLoading] = useOptimistic(false, (_, next) => next);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  }, [onClick, setLoading]);

  // Classes de estilo para cada variante
  const baseClasses =
    "flex items-center gap-2 justify-center font-semibold py-2 px-6 rounded-md transition-colors duration-200";

  const variantClasses = {
    login: "bg-emerald-600 hover:bg-emerald-700 text-white",
    logout: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        loading && "opacity-70 cursor-wait"
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {loading ? (
          <motion.span
            key="loading"
            className="inline-block"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Hourglass />
          </motion.span>
        ) : variant === "login" ? (
          <motion.span
            key="login-icon"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
          >
            <LogIn />
          </motion.span>
        ) : (
          <motion.span
            key="logout-icon"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
          >
            <LogOut />
          </motion.span>
        )}
      </AnimatePresence>

      {loading ? (
        <span>Processando...</span>
      ) : variant === "login" ? (
        <span>Fazer Login</span>
      ) : (
        <span>Sair da Conta</span>
      )}
    </button>
  );
});
