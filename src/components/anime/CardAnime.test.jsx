// src/components/anime/CardAnime.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import CardAnime from "./CardAnime";
import { vi } from "vitest";
import { useFavoritesStore } from "../../store/favoritesStore";

// Mock Zustand e Clerk
vi.mock("../../store/favoritesStore", () => ({
  useFavoritesStore: vi.fn(),
}));

vi.mock("@clerk/clerk-react", () => ({
  useUser: () => ({ isSignedIn: true }),
}));

describe("CardAnime", () => {
  const mockAnime = {
    mal_id: 123,
    title: "Naruto",
    type: "TV",
    score: 8.5,
    genres: [
      { mal_id: 1, name: "Ação" },
      { mal_id: 2, name: "Aventura" },
    ],
    images: {
      jpg: {
        image_url: "https://cdn.example.com/naruto.jpg",
      },
    },
  };

  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();

  beforeEach(() => {
    useFavoritesStore.mockImplementation((selector) =>
      selector({
        addFavorite: mockAddFavorite,
        removeFavorite: mockRemoveFavorite,
        isFavorite: () => false,
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza corretamente com variant padrão", () => {
    render(<CardAnime anime={mockAnime} />);

    expect(screen.getByText("Naruto")).toBeInTheDocument();
    expect(screen.getByText("TV")).toBeInTheDocument();
    expect(screen.getByText("8.5 pts")).toBeInTheDocument();
    expect(screen.getByText("Ação")).toBeInTheDocument();
    expect(screen.getByText("Aventura")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver detalhes/i })).toHaveAttribute(
      "href",
      "/anime/123"
    );
  });

  it("chama addFavorite ao clicar no botão de favorito", () => {
    render(<CardAnime anime={mockAnime} />);

    const favoriteBtn = screen.getByRole("button", {
      name: /adicionar aos favoritos/i,
    });

    fireEvent.click(favoriteBtn);
    expect(mockAddFavorite).toHaveBeenCalledWith(mockAnime);
  });
});
