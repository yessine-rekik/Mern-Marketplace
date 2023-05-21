import React, { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

function Protected() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axiosPrivate.post('/protected').catch((err) => {
      console.log(err);
      navigate('/login', { state: { from: location }, replace: true });
    });
  }, []);

  return <div>Protected Route Accessed</div>;
}

export default Protected;
