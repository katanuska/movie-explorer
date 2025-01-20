import MarkFavorite from './favorite/MarkFavorite';
import { Movie } from './Movie';
import './Movies.css';

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
            <div className="movieCard">
              <img src={movie.posterUrl} alt={movie.title} />
              <div className="movieCardOverlay"></div>
              <div className="movieCardContent">
                <p className="category">{movie.genre}</p>
                <p className="title">{movie.title}</p>
              </div>
            </div>
          </MarkFavorite>
        </div>
      ))}
    </div>
  );
};

export default Movies;
