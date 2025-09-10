// cypress/e2e/anime-platform.cy.js

describe("Plataforma de Anime - Fluxos Principais", () => {
  beforeEach(() => {
    // Intercepta chamadas da API Jikan
    cy.intercept("GET", "**/genres/anime", { fixture: "genres.json" }).as(
      "getGenres"
    );
    cy.intercept("GET", "**/anime?*", { fixture: "search-results.json" }).as(
      "searchAnimes"
    );
    cy.intercept("GET", "**/top/anime", { fixture: "popular-animes.json" }).as(
      "getPopularAnimes"
    );

    cy.visit("/");
  });

  describe("Navegação Básica", () => {
    it("deve carregar a página inicial corretamente", () => {
      cy.contains("AnimeHub").should("be.visible");
      cy.get('[data-testid="search-input"]').should("be.visible");
      cy.get('[data-testid="popular-section"]').should("be.visible");
    });

    it("deve navegar entre as páginas principais", () => {
      // Navegar para Gêneros
      cy.get('[data-testid="genres-link"]').click();
      cy.url().should("include", "/genres");

      // Navegar para Favoritos
      cy.get('[data-testid="favorites-link"]').click();
      cy.url().should("include", "/favorites");

      // Voltar para Home
      cy.get('[data-testid="home-link"]').click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  describe("Busca de Animes", () => {
    it("deve realizar busca e mostrar resultados", () => {
      const searchTerm = "naruto";

      cy.get('[data-testid="search-input"]').type(searchTerm);
      cy.wait("@searchAnimes");

      cy.get('[data-testid="search-results"]').should("be.visible");
      cy.get('[data-testid="anime-card"]').should("have.length.greaterThan", 0);

      // Verificar se os resultados contêm o termo de busca
      cy.get('[data-testid="anime-card"]')
        .first()
        .should("contain.text", "Naruto");
    });

    it("deve mostrar mensagem quando não há resultados", () => {
      cy.intercept("GET", "**/anime?*", { body: { data: [] } }).as(
        "emptySearch"
      );

      cy.get('[data-testid="search-input"]').type("anime inexistente");
      cy.wait("@emptySearch");

      cy.contains("Nenhum anime encontrado").should("be.visible");
    });

    it("deve limpar resultados quando busca é apagada", () => {
      cy.get('[data-testid="search-input"]').type("naruto");
      cy.wait("@searchAnimes");

      cy.get('[data-testid="search-results"]').should("be.visible");

      cy.get('[data-testid="search-input"]').clear();
      cy.get('[data-testid="search-results"]').should("not.exist");
    });
  });

  describe("Detalhes do Anime", () => {
    it("deve navegar para página de detalhes", () => {
      cy.intercept("GET", "**/anime/1", { fixture: "anime-details.json" }).as(
        "getAnimeDetails"
      );

      cy.get('[data-testid="anime-card"]').first().click();

      cy.wait("@getAnimeDetails");
      cy.url().should("include", "/anime/1");

      cy.get('[data-testid="anime-title"]').should("be.visible");
      cy.get('[data-testid="anime-synopsis"]').should("be.visible");
      cy.get('[data-testid="anime-score"]').should("be.visible");
    });
  });

  describe("Sistema de Favoritos (Usuário Logado)", () => {
    beforeEach(() => {
      // Mock do usuário logado
      cy.window().then((win) => {
        win.localStorage.setItem(
          "user-auth",
          JSON.stringify({
            isSignedIn: true,
            userId: "test-user-123",
          })
        );
      });
    });

    it("deve adicionar anime aos favoritos", () => {
      cy.get('[data-testid="anime-card"]')
        .first()
        .find('[data-testid="favorite-button"]')
        .click();

      cy.contains("Anime adicionado aos favoritos").should("be.visible");

      // Verificar se o coração está preenchido
      cy.get('[data-testid="anime-card"]')
        .first()
        .find('[data-testid="favorite-button"]')
        .should("have.class", "text-pink-600");
    });

    it("deve remover anime dos favoritos", () => {
      // Primeiro adiciona
      cy.get('[data-testid="anime-card"]')
        .first()
        .find('[data-testid="favorite-button"]')
        .click();

      // Depois remove
      cy.get('[data-testid="anime-card"]')
        .first()
        .find('[data-testid="favorite-button"]')
        .click();

      cy.contains("Anime removido dos favoritos").should("be.visible");
    });

    it("deve mostrar favoritos na página de favoritos", () => {
      // Adiciona um favorito
      cy.get('[data-testid="anime-card"]')
        .first()
        .find('[data-testid="favorite-button"]')
        .click();

      // Navega para favoritos
      cy.get('[data-testid="favorites-link"]').click();

      // Verifica se o anime está listado
      cy.get('[data-testid="favorites-list"]').should("be.visible");
      cy.get('[data-testid="anime-card"]').should("have.length", 1);
    });
  });

  describe("Sistema de Favoritos (Usuário Não Logado)", () => {
    it("deve mostrar mensagem para fazer login ao tentar favoritar", () => {
      cy.get('[data-testid="anime-card"]')
        .first()
        .find('[data-testid="favorite-button"]')
        .click();

      cy.contains("Você precisa estar logado").should("be.visible");
    });
  });

  describe("Responsividade", () => {
    it("deve funcionar corretamente em dispositivos móveis", () => {
      cy.viewport("iphone-6");

      // Menu mobile deve estar visível
      cy.get('[data-testid="mobile-menu-button"]').should("be.visible");
      cy.get('[data-testid="desktop-nav"]').should("not.be.visible");

      // Abrir menu mobile
      cy.get('[data-testid="mobile-menu-button"]').click();
      cy.get('[data-testid="mobile-menu"]').should("be.visible");

      // Busca deve funcionar
      cy.get('[data-testid="search-input"]').type("test");
      cy.get('[data-testid="search-input"]').should("have.value", "test");
    });
  });

  describe("Performance e Loading", () => {
    it("deve mostrar skeletons durante carregamento", () => {
      // Intercepta API com delay
      cy.intercept("GET", "**/top/anime", (req) => {
        req.reply((res) => {
          return new Promise((resolve) => {
            setTimeout(
              () => resolve(res.send({ fixture: "popular-animes.json" })),
              1000
            );
          });
        });
      }).as("slowPopularAnimes");

      cy.visit("/");

      // Deve mostrar skeletons
      cy.get('[data-testid="anime-skeleton"]').should("be.visible");

      cy.wait("@slowPopularAnimes");

      // Skeletons devem desaparecer
      cy.get('[data-testid="anime-skeleton"]').should("not.exist");
      cy.get('[data-testid="anime-card"]').should("be.visible");
    });
  });
});

// cypress/fixtures/genres.json
/*
{
  "data": [
    { "mal_id": 1, "name": "Action" },
    { "mal_id": 2, "name": "Adventure" },
    { "mal_id": 8, "name": "Drama" }
  ]
}
*/

// cypress/fixtures/search-results.json
/*
{
  "data": [
    {
      "mal_id": 1,
      "title": "Naruto",
      "images": { "webp": { "image_url": "https://example.com/naruto.jpg" } },
      "score": 8.3,
      "type": "TV",
      "genres": [{ "mal_id": 1, "name": "Action" }]
    }
  ]
}
*/
