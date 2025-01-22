import { useUser } from '../auth/UserContext';

const Protected: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  if (!user) return null;

  return children;
};

export default Protected;
