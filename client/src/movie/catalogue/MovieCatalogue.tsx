import { NavLink } from 'react-router';
import MarkFavorite from '../favorite/MarkFavorite';
import { Movie } from '../model/Movie';
import './MovieCatalogue.css';

type MovieCatalogueProps = {
  movies: Movie[];
  defaultFavorite: boolean;
};

const MovieCatalogue: React.FC<MovieCatalogueProps> = ({
  movies,
  defaultFavorite,
}) => {
  return (
    <div className="movie-list">
      {movies?.map((movie: Movie) => (
        <div className="card" key={movie.id}>
          <MarkFavorite id={movie.id} defaultFavorite={defaultFavorite}>
            <NavLink to={`/${movie.id}`} className="movie-card">
              <img src={movie.posterUrl} alt={movie.title} />
              <div className="movie-card-overlay"></div>
              <div className="movie-card-content">
                <p className="category">{movie.genre}</p>
                <p className="title">{movie.title}</p>
              </div>
            </NavLink>
          </MarkFavorite>
        </div>
      ))}
    </div>
  );
};

export default MovieCatalogue;
