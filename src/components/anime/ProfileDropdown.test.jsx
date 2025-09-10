import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock das dependências para isolar o componente
vi.mock("@clerk/clerk-react", () => ({
  useUser: vi.fn(),
  SignInButton: ({ children }) => (
    <div data-testid="signin-button">{children}</div>
  ),
  SignOutButton: ({ children }) => (
    <div data-testid="signout-button">{children}</div>
  ),
  // O UserButton é apenas um gatilho, então podemos mocká-lo como um botão simples
  UserButton: ({ ...props }) => (
    <button data-testid="user-button-trigger" {...props} />
  ),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Importa o componente e os hooks mockados APÓS a definição dos mocks
import ProfileDropdown from "./ProfileDropdown";
import { useUser } from "@clerk/clerk-react";

const mockUseUser = vi.mocked(useUser);

describe("ProfileDropdown", () => {
  beforeEach(() => {
    // Reseta os mocks antes de cada teste
    vi.clearAllMocks();
  });

  describe("quando o usuário não está logado", () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({ isSignedIn: false, user: null });
    });

    it("deve renderizar o botão de login", () => {
      render(<ProfileDropdown />);
      expect(screen.getByTestId("signin-button")).toBeInTheDocument();
      expect(screen.getByLabelText("Entrar")).toBeInTheDocument();
    });

    it("não deve renderizar o botão de usuário ou o menu dropdown", () => {
      render(<ProfileDropdown />);
      expect(screen.queryByTestId("user-button-trigger")).not.toBeInTheDocument();
      expect(screen.queryByText("Meu Perfil")).not.toBeInTheDocument();
      expect(screen.queryByText("Sair")).not.toBeInTheDocument();
    });
  });

  describe("quando o usuário está logado", () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        user: { id: "user_123", fullName: "Carlos" },
      });
    });

    it("deve renderizar o botão de usuário", () => {
      render(<ProfileDropdown />);
      // O UserButton real é renderizado dentro do nosso componente, mas mockamos seu gatilho
      expect(screen.getByTestId("user-button-trigger")).toBeInTheDocument();
      expect(screen.getByLabelText("Menu do perfil")).toBeInTheDocument();
    });

    it("não deve renderizar o botão de login", () => {
      render(<ProfileDropdown />);
      expect(screen.queryByTestId("signin-button")).not.toBeInTheDocument();
    });

    it("deve alternar o menu dropdown ao clicar no botão", async () => {
      const user = userEvent.setup();
      render(<ProfileDropdown />);

      const profileButton = screen.getByLabelText("Menu do perfil");

      // Dropdown está inicialmente fechado
      expect(screen.queryByText("Meu Perfil")).not.toBeInTheDocument();
      expect(profileButton).toHaveAttribute("aria-expanded", "false");

      // Clica para abrir
      await user.click(profileButton);
      expect(screen.getByText("Meu Perfil")).toBeInTheDocument();
      expect(screen.getByText("Sair")).toBeInTheDocument();
      expect(profileButton).toHaveAttribute("aria-expanded", "true");

      // Clica para fechar
      await user.click(profileButton);
      expect(screen.queryByText("Meu Perfil")).not.toBeInTheDocument();
      expect(profileButton).toHaveAttribute("aria-expanded", "false");
    });

    it("deve fechar o dropdown ao clicar no link 'Meu Perfil'", async () => {
      const user = userEvent.setup();
      render(<ProfileDropdown />);

      const profileButton = screen.getByLabelText("Menu do perfil");
      await user.click(profileButton); // Abre o dropdown

      const profileLink = screen.getByText("Meu Perfil");
      await user.click(profileLink);

      // O dropdown deve ser fechado
      expect(screen.queryByText("Meu Perfil")).not.toBeInTheDocument();
      expect(profileButton).toHaveAttribute("aria-expanded", "false");
    });

    it("deve fechar o dropdown ao clicar fora", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ProfileDropdown />
          <div data-testid="outside-element">Outside</div>
        </div>
      );

      const profileButton = screen.getByLabelText("Menu do perfil");
      await user.click(profileButton); // Abre o dropdown

      expect(screen.getByText("Meu Perfil")).toBeInTheDocument();

      // Clica fora
      await user.click(screen.getByTestId("outside-element"));

      // O dropdown deve ser fechado
      expect(screen.queryByText("Meu Perfil")).not.toBeInTheDocument();
    });

    it("deve ter um link para a página de perfil", async () => {
      const user = userEvent.setup();
      render(<ProfileDropdown />);

      await user.click(screen.getByLabelText("Menu do perfil"));

      const profileLink = screen.getByText("Meu Perfil");
      expect(profileLink).toBeInTheDocument();
      expect(profileLink.closest("a")).toHaveAttribute("href", "/profile");
    });
  });
});
