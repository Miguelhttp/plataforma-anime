import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';
import {  } from '@tanstack/react-router';

const queryClient = new QueryClient();

function renderWithProviders(ui) {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
}

describe('Página Home', () => {
  it('exibe os animes populares vindo da API mockada', async () => {
    renderWithProviders(<Home />);

    // Aguarda os dados da API aparecerem
    await waitFor(() => {
      expect(screen.getByText(/Naruto/i)).toBeInTheDocument();
    });

    // Confirma que a imagem também foi renderizada
    const image = screen.getByAltText(/Naruto/i);
    expect(image).toHaveAttribute('src', expect.stringContaining('myanimelist'));
  });
});
