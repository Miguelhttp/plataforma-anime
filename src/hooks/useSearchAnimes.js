import { useQuery } from "@tanstack/react-query";
import { searchAnimes } from "../services/animes";

export function useSearchAnimes(query) {
  return useQuery({
    queryKey: ["searchAnimes", query],
    queryFn: () => searchAnimes(query),
    enabled: !!query, // Só faz a busca se a query não for vazia
    staleTime: 1000 * 60 * 5, // Dados são considerados frescos por 5 minutos
  });
}
