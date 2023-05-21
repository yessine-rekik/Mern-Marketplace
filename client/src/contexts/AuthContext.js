import { createContext, useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import axios from '../config/axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post('/refresh-token');
        setToken(response.data.accessToken);
      } catch (err) {
        console.log(err);
      }
    };

    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
