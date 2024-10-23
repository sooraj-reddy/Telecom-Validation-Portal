import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/home', { replace: true }); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, navigate]); // Dependency array ensures this runs on change

  return isLoggedIn ? children : null; // Only render children if logged in
};

export default PrivateRoute;
