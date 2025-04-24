import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
