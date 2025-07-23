import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import { ClerkProviderWrapper } from "./providers/ClerkProviderWrapper.jsx";
import { QueryProviderWrapper } from "./providers/QueryProviderWrapper.jsx";
import { SyncUserProvider } from "./providers/SyncUserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProviderWrapper>
        <QueryProviderWrapper>
          <SyncUserProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </SyncUserProvider>
        </QueryProviderWrapper>
      </ClerkProviderWrapper>
    </ErrorBoundary>
  </StrictMode>
);
