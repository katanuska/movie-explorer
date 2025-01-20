import { BrowserRouter, Route, Routes } from 'react-router';
import { UserProvider } from './auth/UserContext';
import MovieDetailsPage from './movie/MovieDetailsPage';
import MovieCataloguePage from './movie/MoviesPage';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MovieCataloguePage />} />
          <Route path=":id" element={<MovieDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
