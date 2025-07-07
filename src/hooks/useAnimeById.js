import { useQuery } from '@tanstack/react-query';
import { getAnimeById } from '../services/animes';

export const useAnimeById = (id) => {
  return useQuery({
    queryKey: ['anime', id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,
  })
}