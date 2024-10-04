import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './userContext'; // Adjust the path to your context

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(UserContext); // Assuming user context holds the logged-in user info
  
  if (user) {
    return children; // Render the element if user is authenticated
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;