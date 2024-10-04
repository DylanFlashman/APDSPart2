import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './userContext'; 

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(UserContext); 
  
  if (user) {
    return children; 
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;