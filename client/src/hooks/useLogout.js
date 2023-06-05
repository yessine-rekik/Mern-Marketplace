import axios from '../config/axios';
import useAuth from '../hooks/useAuth';

const useLogout = () => {
  const { setUser } = useAuth();

  const logout = async () => {
    setUser(null);
    try {
      await axios.post('/logout');
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
