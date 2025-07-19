import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import { ClerkProviderWrapper } from "./providers/ClerkProviderWrapper.jsx";
import { QueryProviderWrapper } from "./providers/QueryProviderWrapper.jsx";
import { SyncUserProvider } from "./providers/SyncUserProvider.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProviderWrapper>
      <QueryProviderWrapper>
        <ThemeProvider>
          <SyncUserProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </SyncUserProvider>
        </ThemeProvider>
      </QueryProviderWrapper>
    </ClerkProviderWrapper>
  </StrictMode>
);
