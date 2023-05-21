import axios from '../config/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.post('/refresh-token');

      const { accessToken } = res.data;
      setToken(accessToken);
      return accessToken;
    } catch (err) {
      console.log(err);
      setToken(null);
    }
  };

  return refresh;
};

export default useRefreshToken;
