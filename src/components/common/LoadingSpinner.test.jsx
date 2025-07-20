// Arquivo de teste para o componente LoadingSpinner
import { render, screen } from '@testing-library/react';
import LoadingSpinner from "./LoadingSpinner";

// A função describe é usada para agrupar testes relacionados.
describe("LoadingSpinner", () => {
  // O teste verifica se o componente LoadingSpinner renderiza corretamente.
  it("renderizar o spinner de carregamento", () => {
    // Renderiza o componente LoadingSpinner.
    render(<LoadingSpinner />);
    // Obtém o elemento do spinner de carregamento pelo seu atributo data-testid.
    const spinner = screen.getByTestId("loading-spinner");
    // Verifica se o spinner está presente no documento.
    expect(spinner).toBeInTheDocument();
  })
})