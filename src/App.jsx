import { useLocation } from "@tanstack/react-router";
import AnimatedRoutes from "./components/layout/AnimatedRoutes";
import AppToastContainer from "./components/layout/AppToastContainer";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const pageBackgrounds = {
  "/": "from-[#0D0D1C] to-[#15152B]", // Home
  "/anime": "from-[#1A1A2E] to-[#2B2B44]", // AnimeList
  "/about": "from-[#11111F] to-[#1E1E36]", // About
  // Adicione outras rotas se necessário
};

export default function App() {
  const location = useLocation();
  const gradient =
    pageBackgrounds[location.pathname] || "from-[#0D0D1C] to-[#15152B]";

  return (
    <div
      className={`flex flex-col min-h-svh bg-gradient-to-b ${gradient} text-white transition-colors duration-700`}
    >
      <Header />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
      <AppToastContainer />
    </div>
  );
}
