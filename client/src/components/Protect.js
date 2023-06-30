import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Backdrop from '../components/shared/Backdrop';

function Protect() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !user ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [isLoading]);
  return isLoading ? (
    <Backdrop />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default Protect;
