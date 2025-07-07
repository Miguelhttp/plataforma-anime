import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../services/animes';

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    refetchOnWindowFocus: false,
  });
}
