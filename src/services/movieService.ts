import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const config = {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
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