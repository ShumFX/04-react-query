import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import styles from './App.module.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movieData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: !!searchQuery,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Сбрасываем на первую страницу при новом поиске
    
    if (!query.trim()) {
      toast.error('Please enter your search query.');
      return;
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // Показываем результаты только если есть данные
  const movies = movieData?.results || [];
  const totalPages = movieData?.total_pages || 0;
  const hasResults = movies.length > 0;

  // Показываем сообщение если нет результатов но поиск был выполнен
  React.useEffect(() => {
    if (isSuccess && searchQuery && movies.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, searchQuery, movies.length]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      
      <main className={styles.main}>
        {isLoading && <Loader />}
        
        {isError && (
          <ErrorMessage 
            message={error instanceof Error ? error.message : 'An error occurred'} 
          />
        )}
        
        {!isLoading && !isError && hasResults && (
          <>
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />
            
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default App;