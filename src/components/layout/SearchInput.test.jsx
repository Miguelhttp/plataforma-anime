import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchInput from "./SearchInput";
import * as animesService from "../../services/animes";

// Mock do service
vi.mock("../../services/animes");

// Mock do debounce hook
vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value) => value, // Sem delay para testes
}));

describe("SearchInput Integration", () => {
  let queryClient;

  const renderSearchInput = () => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <SearchInput />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve executar busca quando usuário digita", async () => {
    const mockAnimes = [
      {
        mal_id: 1,
        title: "Naruto",
        images: { webp: { image_url: "naruto.jpg" } },
      },
    ];

    vi.mocked(animesService.searchAnimes).mockResolvedValue(mockAnimes);

    renderSearchInput();

    const searchInput = screen.getByPlaceholderText(/buscar anime/i);
    fireEvent.change(searchInput, { target: { value: "naruto" } });

    await waitFor(() => {
      expect(animesService.searchAnimes).toHaveBeenCalledWith("naruto");
    });
  });

  it("deve mostrar resultados da busca", async () => {
    const mockAnimes = [
      {
        mal_id: 1,
        title: "Naruto",
        images: { webp: { image_url: "naruto.jpg" } },
      },
      {
        mal_id: 2,
        title: "One Piece",
        images: { webp: { image_url: "onepiece.jpg" } },
      },
    ];

    vi.mocked(animesService.searchAnimes).mockResolvedValue(mockAnimes);

    renderSearchInput();

    const searchInput = screen.getByPlaceholderText(/buscar anime/i);
    fireEvent.change(searchInput, { target: { value: "anime" } });

    await waitFor(() => {
      expect(screen.getByText("Naruto")).toBeInTheDocument();
      expect(screen.getByText("One Piece")).toBeInTheDocument();
    });
  });

  it("deve mostrar estado de loading durante busca", async () => {
    // Mock que demora para resolver
    vi.mocked(animesService.searchAnimes).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    renderSearchInput();

    const searchInput = screen.getByPlaceholderText(/buscar anime/i);
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Deve mostrar loading
    await waitFor(() => {
      expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
    });
  });

  it("deve limpar resultados quando input fica vazio", async () => {
    const mockAnimes = [
      {
        mal_id: 1,
        title: "Naruto",
        images: { webp: { image_url: "naruto.jpg" } },
      },
    ];

    vi.mocked(animesService.searchAnimes).mockResolvedValue(mockAnimes);

    renderSearchInput();

    const searchInput = screen.getByPlaceholderText(/buscar anime/i);

    // Primeiro, busca por algo
    fireEvent.change(searchInput, { target: { value: "naruto" } });

    await waitFor(() => {
      expect(screen.getByText("Naruto")).toBeInTheDocument();
    });

    // Depois, limpa o input
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByText("Naruto")).not.toBeInTheDocument();
    });
  });

  it("deve mostrar mensagem quando não há resultados", async () => {
    vi.mocked(animesService.searchAnimes).mockResolvedValue([]);

    renderSearchInput();

    const searchInput = screen.getByPlaceholderText(/buscar anime/i);
    fireEvent.change(searchInput, { target: { value: "anime inexistente" } });

    await waitFor(() => {
      expect(screen.getByText(/nenhum anime encontrado/i)).toBeInTheDocument();
    });
  });

  it("deve tratar erro na busca", async () => {
    vi.mocked(animesService.searchAnimes).mockRejectedValue(
      new Error("API Error")
    );

    renderSearchInput();

    const searchInput = screen.getByPlaceholderText(/buscar anime/i);
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText(/erro ao buscar/i)).toBeInTheDocument();
    });
  });
});
