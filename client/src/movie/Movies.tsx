import { Movie } from './Movie';
import './Movies.css';

type MoviesProps = {
  movies: Movie[];
};

const Movies: React.FC<MoviesProps> = ({ movies }) => {
  return (
    <div className="movieList">
      {movies?.map((movie: Movie) => (
        <div className="movieCard" key={movie.id}>
          <img src={movie.posterUrl} alt={movie.title} />
          <div className="movieCardOverlay"></div>
          <div className="movieCardContent">
            <p className="category">{movie.genre}</p>
            <p className="title">{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
