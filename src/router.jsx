import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import App from "./App.jsx";

import About from "./pages/About";
import AnimeDetails from "./pages/AnimeDetails";
import AnimeList from "./pages/AnimeList";
import ErrorPage from "./pages/ErrorPage";
import Favorites from "./pages/Favorites";
import Genres from "./pages/Genres";
import Home from "./pages/Home";
import ProtectedUserProfile from "./pages/ProtectedUserProfile";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import SignInPage from "./pages/auth/SignInPage/";
import SignUpPage from "./pages/auth/SignUpPage";

//INFO: ROTA ROOT
const rootRoute = createRootRoute({
  component: () => (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA ANIMES (/animes?q=alguma-coisa)
// Esta rota é responsável por buscar animes com base na query de pesquisa
const animesRoute = createRoute({
  path: "/anime",
  getParentRoute: () => rootRoute,
  component: AnimeList,
  validateSearch: (search) => ({
    query: search.query ?? "",
  }),
});

//INFO: ROTA CHILDREN
const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Home,
  errorComponent: ErrorPage,
});

//INFO: ROTA ANIME DETAILS (/anime/:id)
const animeDetailsRoute = createRoute({
  path: "/anime/$id",
  getParentRoute: () => rootRoute,
  component: AnimeDetails,
  errorComponent: ErrorPage,
});

//INFO: ROTA ABOUT
const aboutRoute = createRoute({
  path: "/about",
  getParentRoute: () => rootRoute,
  component: About,
  errorComponent: ErrorPage,
});

//INFO: ROTA DE FAVORITES
const favoritesRoute = createRoute({
  path: "/favorites",
  getParentRoute: () => rootRoute,
  component: Favorites,
  errorComponent: ErrorPage,
});

//INFO: ROTA DE GÊNEROS DE ANIME
const genresRoute = createRoute({
  path: "/genres/$genreId",
  getParentRoute: () => rootRoute,
  component: Genres,
  errorComponent: ErrorPage,
});

//INFO: ROTA DE USER PROFILE
const userProfileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: () => (
    <ProtectedRoute>
      <ProtectedUserProfile />
    </ProtectedRoute>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA DE SIGN IN
const signInRoute = createRoute({
  path: "/sign-in",
  getParentRoute: () => rootRoute,
  component: SignInPage,
});

//INFO: ROTA DE SIGN UP
const signUpRoute = createRoute({
  path: "/sign-up",
  getParentRoute: () => rootRoute,
  component: SignUpPage,
});

//INFO: ROUTE TREE (Arvore de rotas)
const routeTree = rootRoute.addChildren([
  indexRoute,
  animeDetailsRoute,
  animesRoute,
  genresRoute,
  aboutRoute,
  favoritesRoute,
  userProfileRoute, // Rota de perfil do usuário
  signInRoute, // Rota de login
  signUpRoute, // Rota de registro  
]);

//INFO: CRIANDO O ROUTER
export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: ErrorPage,
});
