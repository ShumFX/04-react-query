import axios from 'axios';
import type { Movie } from '../types/movie';

// Интерфейс для ответа API перенесен сюда
export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<MovieResponse> => {
  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/search/movie`,
    config
  );

  return response.data;
};