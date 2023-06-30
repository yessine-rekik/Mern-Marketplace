import React, { useEffect, useState } from 'react';
import { fetchAll } from './api';
import AdCard from './AdCard';
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Backdrop from '../../components/shared/Backdrop';

const fetchLimit = 20;

function AdsList() {
  const [ads, setAds] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isAllFetched, setIsAllFetched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage >= 0.75) {
        if (!isAllFetched) setShouldFetch(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsFetching(true);

        const data = await fetchAll(0, fetchLimit, {
          search: searchParams.get('search'),
        });

        setAds(data);
        setIsLoading(false);
        if (!data.length) return setIsAllFetched(true);
      } catch (error) {
        alert('error');
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    setIsFetching(false);
    setShouldFetch(false);
  }, [ads]);

  useEffect(() => {
    if (isFetching || !shouldFetch) return;

    fetchAll(ads.length, fetchLimit, {
      search: searchParams.get('search'),
    }).then((data) => {
      if (!data.length) return setIsAllFetched(true);
      setAds((ads) => [...ads, ...data]);
    });
  }, [shouldFetch]);

  if (isLoading) return <Backdrop />;

  if (isAllFetched && !ads.length)
    return <h2>{`No results for: ${searchParams.get('search')}`}</h2>;

  return (
    <Box>
      <Grid container spacing={'1rem'} maxWidth="lg">
        {ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </Grid>
    </Box>
  );
}

export default AdsList;
