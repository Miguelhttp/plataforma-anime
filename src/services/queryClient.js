import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes sem refetch
      cacheTime: 1000 * 60 * 10, // 10 minutes sem refetch
      retry: 1, // Tenta refetch uma vez em caso de falha
      refetchOnWindowFocus: false, // Não refetch ao focar na janela
    }
  }
})

export default queryClient;