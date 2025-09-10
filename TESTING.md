# 🧪 Guia de Testes - Plataforma de Anime

## 📋 **Resumo do Plano de Testes**

### **Cobertura Implementada:**

- ✅ **Testes Unitários**: Componentes, Hooks, Services, Stores
- ✅ **Testes de Integração**: Fluxos de dados e interação entre componentes
- ✅ **Testes E2E**: Fluxos críticos do usuário
- ✅ **Setup Completo**: Mocks, fixtures, configurações

---

## 🚀 **Como Executar os Testes**

### **Testes Unitários e Integração (Vitest)**

```bash
# Executar todos os testes uma vez
pnpm test

# Executar em modo watch (desenvolvimento)
pnpm test:watch

# Executar com relatório de cobertura
pnpm test:coverage
```

### **Testes E2E (Cypress)**

```bash
# Instalar Cypress (primeira vez)
pnpm add -D cypress

# Executar E2E em modo headless
pnpm test:e2e

# Abrir interface do Cypress
pnpm test:e2e:open

# Executar todos os tipos de teste
pnpm test:all
```

---

## 📁 **Estrutura dos Testes**

```
src/
├── tests/
│   └── setupTests.js                 # Configuração global dos testes
├── store/
│   └── favoritesStore.test.js       # Testes do Zustand store
├── services/
│   └── animes.test.js               # Testes das funções de API
├── hooks/
│   └── useSearchAnimes.test.js      # Testes dos hooks customizados
├── components/
│   ├── anime/
│   │   └── CardAnime.test.jsx       # Testes do componente CardAnime
│   ├── layout/
│   │   └── SearchInput.test.jsx     # Testes de integração da busca
│   └── common/
│       └── LoadingSpinner.test.jsx  # Teste simples de renderização

cypress/
├── e2e/
│   └── anime-platform.cy.js        # Testes E2E completos
├── fixtures/                       # Dados mockados para E2E
└── cypress.config.js               # Configuração do Cypress
```

---

## ⭐ **Prioridades de Implementação**

### **🔥 PRIORIDADE ALTA (Implementar Primeiro)**

#### **1. Stores Zustand**

- [x] `favoritesStore.test.js` - Gerenciamento de favoritos
- [ ] `animeStore.test.js` - Se existir store adicional

#### **2. Services/API**

- [x] `animes.test.js` - Todas as funções de API
- [ ] `queryClient.test.js` - Configurações do React Query

#### **3. Hooks Customizados Críticos**

- [x] `useSearchAnimes.test.js` - Busca principal
- [ ] `useAnimeById.test.js` - Detalhes do anime
- [ ] `useFeaturedAnime.test.js` - Homepage
- [ ] `usePopularAnimes.test.js` - Lista popular

#### **4. Componentes Core**

- [x] `CardAnime.test.jsx` - Componente mais usado
- [ ] `AnimeSection.test.jsx` - Container de listas
- [ ] `HeroBanner.test.jsx` - Banner principal

### **🟡 PRIORIDADE MÉDIA**

#### **5. Testes de Integração**

- [x] `SearchInput.test.jsx` - Fluxo completo de busca
- [ ] `Header.test.jsx` - Navegação principal
- [ ] `MobileMenu.test.jsx` - Menu responsivo

#### **6. Páginas Principais**

- [ ] `Home/index.test.jsx` - Página inicial
- [ ] `AnimeDetails/index.test.jsx` - Página de detalhes
- [ ] `Favorites/index.test.jsx` - Página de favoritos

### **🟢 PRIORIDADE BAIXA**

#### **7. Testes E2E**

- [x] `anime-platform.cy.js` - Fluxos críticos

#### **8. Componentes de Layout**

- [ ] `Footer.test.jsx`
- [ ] `GenresDropdown.test.jsx`
- [ ] `ProfileDropdown.test.jsx`

---

## 🎯 **Casos de Teste Específicos por Área**

### **🏪 FavoritesStore**

- ✅ Adicionar/remover favoritos
- ✅ Verificar se anime é favorito
- ✅ Persistência no localStorage
- ✅ Validação de usuário logado
- ✅ Limpeza ao trocar usuário

### **🌐 Services API**

- ✅ Busca de animes com filtros
- ✅ Detalhes por ID
- ✅ Gêneros disponíveis
- ✅ Animes sazonais
- ✅ Tratamento de erros
- ✅ Timeouts e falhas de rede

### **🎮 CardAnime Component**

- ✅ Renderização com/sem dados
- ✅ Toggle de favoritos
- ✅ Variantes (default/list)
- ✅ Estados visuais (loading, error)
- ✅ Navegação para detalhes
- ✅ Fallback de imagem

### **🔍 Busca Integrada**

- ✅ Debounce funcionando
- ✅ Resultados em tempo real
- ✅ Estados de loading/error/empty
- ✅ Limpeza de resultados

### **🚀 Fluxos E2E**

- ✅ Navegação entre páginas
- ✅ Busca e visualização de resultados
- ✅ Sistema de favoritos (logado/não logado)
- ✅ Responsividade mobile
- ✅ Performance e loading states

---

## 🛠️ **Configurações e Mocks**

### **Mocks Globais (`setupTests.js`)**

- ✅ Clerk (autenticação)
- ✅ TanStack Router (navegação)
- ✅ Framer Motion (animações)
- ✅ React Toastify (notificações)
- ✅ Variáveis de ambiente

### **Fixtures E2E**

- ✅ Dados de gêneros
- ✅ Resultados de busca
- ✅ Detalhes de anime
- ✅ Lista popular

---

## 📊 **Métricas e Cobertura**

### **Objetivos de Cobertura:**

- **Stores**: 100% (crítico para funcionalidade)
- **Services**: 95% (core da aplicação)
- **Hooks**: 90% (lógica de negócio)
- **Componentes**: 80% (UI com variações)
- **Páginas**: 70% (integração)

### **Comando para Verificar Cobertura:**

```bash
pnpm test:coverage
```

---

## 🔧 **Melhorias Sugeridas na Estrutura**

### **1. Data-testids Padronizados**

Adicionar `data-testid` consistentes em componentes:

```jsx
// Exemplo para CardAnime
<div data-testid={`anime-card-${anime.mal_id}`}>
  <button data-testid="favorite-button" />
  <img data-testid="anime-image" />
</div>
```

### **2. Separação de Concerns**

```javascript
// utils/test-utils.js - Helpers para testes
export const renderWithProviders = (component) => {
  // Setup padrão com QueryClient + Clerk
};

export const mockAnime = {
  mal_id: 1,
  title: "Test Anime",
  // ... propriedades padrão
};
```

### **3. Ambiente de Teste Isolado**

```javascript
// .env.test
VITE_API_URL=http://localhost:3001/mock-api
VITE_CLERK_PUBLISHABLE_KEY=test_key
```

### **4. MSW para Mocks de API**

```javascript
// mocks/handlers.js
export const handlers = [
  rest.get("*/anime", (req, res, ctx) => {
    return res(ctx.json({ data: mockAnimes }));
  }),
];
```

---

## 🚨 **Comandos Essenciais**

```bash
# Setup inicial
pnpm install

# Desenvolvimento com testes
pnpm test:watch

# Antes de fazer commit
pnpm test && pnpm test:coverage

# CI/CD pipeline
pnpm test:all

# Debug de testes específicos
pnpm test -- favoritesStore
pnpm test -- CardAnime
```

---

## 📝 **Próximos Passos**

1. **Implementar testes faltantes na ordem de prioridade**
2. **Adicionar data-testids nos componentes**
3. **Configurar MSW para mocks mais realistas**
4. **Integrar testes no pipeline de CI/CD**
5. **Monitorar cobertura e ajustar conforme necessário**

---

**💡 Dica**: Comece sempre pelos testes de **Stores** e **Services**, pois eles são a base da aplicação e oferecem maior ROI em termos de detecção de bugs!
