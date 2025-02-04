import React, { useEffect } from 'react';

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    
    window.location.href = 'http://localhost:5000/login/google';
  }, []);

  return <p>Redirecting to Google login...</p>;
};

export default LoginRedirect;