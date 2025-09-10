import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock do Clerk
vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(() => ({ isSignedIn: false, user: null })),
  ClerkProvider: ({ children }) => children,
  SignIn: () => "Sign In Component",
  SignUp: () => "Sign Up Component",
}));

// Mock do TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }) => children,
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
}));

// Mock do Framer Motion para evitar problemas de animação
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => children,
    img: ({ children, ...props }) => children,
  },
  AnimatePresence: ({ children }) => children,
  useReducedMotion: () => false,
}));

// Mock do react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Variables de ambiente para testes
process.env.VITE_API_URL = "https://api.jikan.moe/v4";
