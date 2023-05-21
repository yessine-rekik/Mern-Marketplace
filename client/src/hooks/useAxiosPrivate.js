import React, { useEffect } from 'react';
import axios from '../config/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { token } = useAuth();

  useEffect(() => {
    // If refresh token is not present in the cookie, reject request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    // If access token has expired, try to ask for a new one.
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response?.status === 401 && !prevReq.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh]);

  return axios;
}

export default useAxiosPrivate;
