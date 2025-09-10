import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock do useUser do Clerk
vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(),
}));

// Mock do favorites store
vi.mock("../../store/favoritesStore", () => ({
  useFavoritesStore: vi.fn(),
}));

// Mock do react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock do TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Importação DEPOIS dos mocks
import CardAnime from "./CardAnime";
import { useUser } from "@clerk/clerk-react";
import { useFavoritesStore } from "../../store/favoritesStore";

const mockUseUser = vi.mocked(useUser);
const mockUseFavoritesStore = vi.mocked(useFavoritesStore);

// Mock functions que serão usadas nos testes
const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();
const mockIsFavorite = vi.fn();

describe("CardAnime", () => {
  const mockAnime = {
    mal_id: 1,
    title: "Test Anime",
    images: {
      webp: { image_url: "https://example.com/anime.jpg" },
    },
    genres: [
      { mal_id: 1, name: "Action" },
      { mal_id: 2, name: "Adventure" },
      { mal_id: 3, name: "Drama" },
      { mal_id: 4, name: "Comedy" }, // Teste com mais de 3 gêneros
    ],
    score: 8.5,
    type: "TV",
  };

  let user;

  const renderCardAnime = (anime = mockAnime, variant = "default") => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <CardAnime anime={anime} variant={variant} />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();

    // Configure mocks
    mockUseUser.mockReturnValue({ isSignedIn: true });

    // Configure the favorites store mock
    mockUseFavoritesStore.mockImplementation((selector) => {
      const state = {
        addFavorite: mockAddFavorite,
        removeFavorite: mockRemoveFavorite,
      };
      return selector(state);
    });
    mockUseFavoritesStore.getState = vi.fn(() => ({
      isFavorite: mockIsFavorite,
    }));
    mockIsFavorite.mockReturnValue(false); // Default para não favorito
  });

  describe("Renderização Básica", () => {
    it("deve renderizar informações básicas do anime", () => {
      renderCardAnime();

      expect(screen.getByText("Test Anime")).toBeInTheDocument();
      expect(screen.getByText("8.5 pts")).toBeInTheDocument();
      expect(screen.getByText("TV")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Adventure")).toBeInTheDocument();
      expect(screen.getByText("Drama")).toBeInTheDocument();
      // Não deve mostrar o 4º gênero (Comedy)
      expect(screen.queryByText("Comedy")).not.toBeInTheDocument();
    });

    it("deve renderizar imagem do anime", () => {
      renderCardAnime();

      const image = screen.getByAltText("Test Anime");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://example.com/anime.jpg");
    });

    it("deve usar imagem fallback quando não há imagem", () => {
      const animeWithoutImage = { ...mockAnime };
      delete animeWithoutImage.images;

      renderCardAnime(animeWithoutImage);

      const image = screen.getByAltText("Test Anime");
      expect(image).toHaveAttribute("src", "/fallback-anime.jpg");
    });
  });

  describe("Variantes", () => {
    it("deve renderizar variante default corretamente", () => {
      renderCardAnime(mockAnime, "default");

      const card = screen.getByText("Test Anime").closest("div");
      expect(card).toHaveClass("w-[200px]");
    });

    it("deve renderizar variante list corretamente", () => {
      renderCardAnime(mockAnime, "list");

      const card = screen.getByText("Test Anime").closest("div");
      expect(card).toHaveClass("flex");
      expect(card).toHaveClass("max-w-xl");
    });
  });

  describe("Funcionalidade de Favoritos", () => {
    it("deve adicionar anime aos favoritos quando usuário logado", async () => {
      mockUseUser.mockReturnValue({ isSignedIn: true });
      renderCardAnime();

      const favoriteButton = screen.getByRole("button", {
        name: "Adicionar aos favoritos",
      });
      await user.click(favoriteButton);

      await waitFor(() => {
        expect(mockAddFavorite).toHaveBeenCalledWith(mockAnime);
      });
    });

    it("deve remover anime dos favoritos quando já é favorito", async () => {
      mockUseUser.mockReturnValue({ isSignedIn: true });
      mockIsFavorite.mockReturnValue(true);

      renderCardAnime();

      const favoriteButton = screen.getByRole("button", {
        name: "Remover do favoritos",
      });
      await user.click(favoriteButton);

      await waitFor(() => {
        expect(mockRemoveFavorite).toHaveBeenCalledWith(mockAnime.mal_id);
      });
    });

    it("deve mostrar toast quando usuário não está logado", async () => {
      mockUseUser.mockReturnValue({ isSignedIn: false });
      const { toast } = await import("react-toastify"); // Importa o mock
      const toastSpy = vi.spyOn(toast, "info");

      renderCardAnime();

      const favoriteButton = screen.getByRole("button", {
        name: "Adicionar aos favoritos",
      });
      await user.click(favoriteButton);

      await waitFor(() => {
        expect(toastSpy).toHaveBeenCalledWith(
          "Você precisa estar logado para favoritar animes.",
          { toastId: "auth-error" }
        );
      });
      expect(mockAddFavorite).not.toHaveBeenCalled();
    });
  });

  describe("Estados Visuais", () => {
    it("deve mostrar coração preenchido para anime favorito", () => {
      mockIsFavorite.mockReturnValue(true);
      renderCardAnime();

      const favoriteButton = screen.getByRole("button", {
        name: "Remover do favoritos",
      });
      const heartIcon = favoriteButton.querySelector("svg");

      expect(heartIcon).toHaveClass("text-pink-600");
    });

    it("deve mostrar coração vazio para anime não favorito", () => {
      mockIsFavorite.mockReturnValue(false);
      renderCardAnime();

      const favoriteButton = screen.getByRole("button", {
        name: "Adicionar aos favoritos",
      });
      const heartIcon = favoriteButton.querySelector("svg");

      expect(heartIcon).toHaveClass("text-gray-300");
    });
  });

  describe("Navegação", () => {
    it("deve ter link para página de detalhes", () => {
      renderCardAnime();

      const detailsLink = screen.getAllByRole("link", {
        name: /ver detalhes/i,
      })[0];
      expect(detailsLink).toHaveAttribute("href", "/anime/1");
    });
  });

  describe("Tratamento de Dados Faltantes", () => {
    it("deve tratar score ausente", () => {
      const animeWithoutScore = { ...mockAnime };
      delete animeWithoutScore.score;

      renderCardAnime(animeWithoutScore);

      expect(screen.getByText("N/A pts")).toBeInTheDocument();
    });

    it("deve tratar gêneros ausentes", () => {
      const animeWithoutGenres = { ...mockAnime };
      delete animeWithoutGenres.genres;

      renderCardAnime(animeWithoutGenres);

      // Não deve quebrar a renderização
      expect(screen.getByText("Test Anime")).toBeInTheDocument();
    });
  });
});
