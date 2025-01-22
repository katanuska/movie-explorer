import { BrowserRouter, Route, Routes } from 'react-router';
import { UserProvider } from './auth/UserContext';
import MovieDetailsPage from './movie/MovieDetailsPage';
import MovieCataloguePage from './movie/MoviesPage';
import FavoriteMoviesPage from './movie/FavoriteMoviesPage';
import Protected from './components/Protected';

// TODO: add rate limiting
// TODO: add health check
// TODO: add tests

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MovieCataloguePage />} />
          <Route
            path="favorites"
            element={
              <Protected>
                <FavoriteMoviesPage />
              </Protected>
            }
          />
          <Route path=":id" element={<MovieDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
