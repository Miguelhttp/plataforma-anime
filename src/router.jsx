import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

const App = lazy(() => import("./App"));
const Home = lazy(() => import("./pages/Home"));
const AnimeList = lazy(() => import("./pages/AnimeList"));
const AnimeDetails = lazy(() => import("./pages/AnimeDetails"));
const About = lazy(() => import("./pages/About"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Genres = lazy(() => import("./pages/Genres"));
const ProtectedUserProfile = lazy(() => import("./pages/ProtectedUserProfile"));
const SignInPage = lazy(() => import("./pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));

import LoadingSpinner from "./components/common/LoadingSpinner";

//INFO: ROTA ROOT
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA ANIMES (/animes?q=alguma-coisa)
// Esta rota é responsável por buscar animes com base na query de pesquisa
const animesRoute = createRoute({
  path: "/anime",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <AnimeList />
    </Suspense>
  ),
  validateSearch: (search) => ({
    query: search.query ?? "",
  }),
});

//INFO: ROTA CHILDREN
const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <Home />
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA ANIME DETAILS (/anime/:id)
const animeDetailsRoute = createRoute({
  path: "/anime/$id",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <AnimeDetails />
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA ABOUT
const aboutRoute = createRoute({
  path: "/about",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <About />
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA DE FAVORITES
const favoritesRoute = createRoute({
  path: "/favorites",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <Favorites />
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA DE GÊNEROS DE ANIME
const genresRoute = createRoute({
  path: "/genres/$genreId",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <Genres />
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA DE USER PROFILE
const userProfileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <ProtectedUserProfile />
    </Suspense>
  ),
  errorComponent: ErrorPage,
});

//INFO: ROTA DE SIGN IN
const signInRoute = createRoute({
  path: "/sign-in",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <SignInPage />
    </Suspense>
  ),
});

//INFO: ROTA DE SIGN UP
const signUpRoute = createRoute({
  path: "/sign-up",
  getParentRoute: () => rootRoute,
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpPage />
    </Suspense>
  ),
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
