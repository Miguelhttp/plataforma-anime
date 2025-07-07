import { motion } from "framer-motion";

export default function WrapperPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-[calc(100vh-6rem)]"
    >
      {children}
    </motion.div>
  )
}