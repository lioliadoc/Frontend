import React, { useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    
    window.location.href = `${API_URL}/login/google`;
  }, []);

  return <p>Redirecting to Google login...</p>;
};

export default LoginRedirect;