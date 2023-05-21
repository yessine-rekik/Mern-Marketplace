import axios from '../config/axios';
import useAuth from '../hooks/useAuth';

const useLogout = () => {
  const { setToken } = useAuth();

  const logout = async () => {
    setToken(null);
    try {
      await axios.post('/logout');
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
