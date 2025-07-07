import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../services/animes';

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
}
