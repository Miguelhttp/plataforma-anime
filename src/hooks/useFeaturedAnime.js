import { useQuery } from '@tanstack/react-query';

// Função para buscar um anime específico pelo ID (exemplo para o banner)
// Você pode ajustar o ID ou a lógica para buscar o "anime em destaque"
const fetchFeaturedAnime = async (animeId) => {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar anime em destaque');
  }
  const data = await response.json();
  return data.data; // Retorna os dados do anime
};

// Hook personalizado para o anime em destaque
export const useFeaturedAnime = (animeId = 1) => { // ID padrão 1 para exemplo
  return useQuery({
    queryKey: ['featuredAnime', animeId], // Chave da query com o ID do anime
    queryFn: () => fetchFeaturedAnime(animeId), // Função que executa a busca
    staleTime: 1000 * 60 * 5, // Dados considerados "frescos" por 5 minutos
    cacheTime: 1000 * 60 * 60, // Dados permanecem no cache por 1 hora
    // Outras opções podem ser adicionadas aqui, como retries, refetchOnWindowFocus, etc.
    retry: 1,
    refetchOnWindowFocus: false, // Não refazer a busca ao focar na janela
  });
};
