import { NavLink } from 'react-router';
import MarkFavorite from '../favorite/MarkFavorite';
import { Movie } from '../Movie';
import './MovieCatalogue.css';

type MoviesProps = {
  movies: Movie[];
  favorite: boolean;
};

const Movies: React.FC<MoviesProps> = ({ movies, favorite }) => {
  return (
    <div className="movieList">
      {movies?.map((movie: Movie) => (
        <div className="card" key={movie.id}>
          <MarkFavorite id={movie.id} defaultFavorite={favorite}>
            <NavLink to={`/${movie.id}`} className="movieCard">
              <img src={movie.posterUrl} alt={movie.title} />
              <div className="movieCardOverlay"></div>
              <div className="movieCardContent">
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

export default Movies;
