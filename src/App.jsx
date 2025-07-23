import AnimatedRoutes from "./components/layout/AnimatedRoutes";
import AppToastContainer from "./components/layout/AppToastContainer";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D1C] to-[#15152B] text-white">
      <Header />
        <AnimatedRoutes />
      <Footer />
      <AppToastContainer />
    </div>
  );
}
