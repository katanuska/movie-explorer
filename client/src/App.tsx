import './App.css';
import { UserProvider } from './auth/UserContext';
import MovieCataloguePage from './movie/MovieCataloguePage';

function App() {
  return (
    <UserProvider>
      <MovieCataloguePage />
    </UserProvider>
  );
}

export default App;
