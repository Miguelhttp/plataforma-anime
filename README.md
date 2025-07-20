# Documentação da Plataforma de anime - AnimeHub ⛩️

[![License](https://img.shields.io/github/license/Miguelhttp/animehub)](./LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=000)](https://react.dev)
[![TanStack Router](https://img.shields.io/badge/Router-TanStack-FF6A00?logo=react-router)](https://tanstack.com/router)
[![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

>Uma plataforma web moderna para explorar, buscar e favoritar animes - inspirada em interface como Crunchyroll e MyAnimeList

## ✨ Funcionalidades

- 🔎 Buscar animes por nome
- 🌟 Ver animes populares, top ranked e recomendados
- 🧭 Navegação por gênero (aventura, mistério, etc.)
- ❤️ Adicionar e remover favoritos (somente usuários autenticados)
- 📱 Layout responsivo e acessível
- 🧑‍💼 Autenticação com Clerk
- 🎨 Dark Mode com persistência
- ⚙️ Skeleton loaders e tratamento de erros

## 📸 Imagem de destaque
> Banner interativo com carrossel animado de animes em destaque

---

## 🛠️ Tecnologias

| Categoria         | Tecnologias                                                    |
|------------------|----------------------------------------------------------------|
| Frontend         | React + Vite + TailwindCSS                                     |
| Navegação        | TanStack Router                                                |
| Dados/API        | React Query + Jikan API                                        |
| Autenticação     | Clerk (SignInButton, SignedIn, SignedOut)                      |
| Animações        | Framer Motion + SwiperJS                                       |
| Estado Global    | Zustand (favoritos, tema, etc.)                                |
| Feedback Visual  | React Toastify, Skeletons personalizados                       |

---


## 🚀 Instalação

1. Clone o repositório

```bash
git clone https://github.com/Miguelhttp/plataforma-anime.git
cd plataforma-anime
```

2. Instale as dependências
```bash
pnpm install
```

3. Crie um arquivo .env com a variável da API 
```env
VITE_API_URL=https://api.jikan.moe/v4
```

4. Inicie o projeto em modo desenvolvimento
```bash
pnpm dev
```

## Estrutura de pastas

```bash
src/
├── assets/
├── components/
│   ├── anime/
│   ├── common/
│   └── ui/
├── hooks/
├── pages/
├── services/
├── store/
├── styles/
├── App.jsx
├── main.jsx
└── router.jsx

```# Atualização
