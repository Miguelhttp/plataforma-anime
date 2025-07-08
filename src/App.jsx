import ErrorBoundary from "./components/common/ErrorBoundary";
import AnimatedRoutes from "./components/layout/AnimatedRoutes";
import AppToastContainer from "./components/layout/AppToastContainer";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { useThemeManager } from "./providers/ThemeManager";

export default function App() {
  const { theme, mounted } = useThemeManager();

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
        <AnimatedRoutes />
      </ErrorBoundary>
      <Footer />
      <AppToastContainer />
    </div>
  );
}
