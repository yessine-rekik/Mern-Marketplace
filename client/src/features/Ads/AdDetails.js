import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchOne } from './api';
import { getFormattedPrice } from '../../utils/getFormattedPrice';
import Backdrop from '../../components/shared/Backdrop';
function AdDetails() {
  const [ad, setAd] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { id } = useParams();

  const cardMediaRef = useRef(); // fixing image loaded before the state isImageLoaded changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOne(id);
        if (data.title) document.title = data.title;
        setAd(data);
        if (data.images?.length) setSelectedImage(data.images[0]);
      } catch (err) {
        alert('Error while fetching');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cardMediaRef?.current?.complete) return;
    setIsImageLoading(true);
  }, [selectedImage]);

  const nextImage = () => {
    setSelectedImage((selectedImage) => {
      const currentIndex = ad.images.findIndex(
        (image) => image === selectedImage
      );
      if (currentIndex === ad.images.length - 1) return ad.images[0];
      else return ad.images[currentIndex + 1];
    });
  };

  const previousImage = () => {
    setSelectedImage((selectedImage) => {
      const currentIndex = ad.images.findIndex(
        (image) => image === selectedImage
      );
      if (currentIndex === 0) return ad.images[ad.images.length - 1];
      else return ad.images[currentIndex - 1];
    });
  };

  if (isLoading) return <Backdrop />;
  if (!ad) return <h2>No results</h2>;

  return (
    <>
      <Grid container sx={styles.gridContainer}>
        <Grid item padding={'0.5rem'} position="relative" xs={12} md={5}>
          <Box sx={{ position: { xs: 'static', md: 'sticky' }, top: '7rem' }}>
            <Card style={styles.mainCard}>
              {isImageLoading && (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: '100%',
                    height: { xs: '60vh' },
                  }}
                />
              )}
              <CardMedia
                ref={cardMediaRef}
                component="img"
                image={selectedImage}
                onLoad={() => setIsImageLoading(false)}
                sx={{
                  display: isImageLoading ? 'none' : 'block',
                  objectFit: 'contain',
                  height: { xs: '60vh' },
                }}
              />
              {ad.images.length > 1 && (
                <>
                  <IconButton
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: 0,
                      marginRight: '0.5rem',
                    }}
                  >
                    <ArrowRight
                      style={{
                        backgroundColor: 'black',
                        borderRadius: '40%',
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                  <IconButton
                    onClick={previousImage}
                    style={{
                      position: 'absolute',
                      left: 0,
                    }}
                  >
                    <ArrowLeft
                      style={{
                        backgroundColor: 'black',
                        borderRadius: '50%',
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                </>
              )}
            </Card>
            <div style={{ margin: '1rem' }}>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                {ad.images.map((image, index) => (
                  <Grid item xs={2.4} key={index}>
                    <Card
                      onClick={() => setSelectedImage(image)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <CardMedia
                        component="img"
                        image={image}
                        height={75}
                        sx={
                          {
                            // objectFit: 'contain',
                          }
                        }
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Box>
        </Grid>

        {/* <Divider sx={{ marginY: '2rem', marginX: '1rem' }} /> */}

        <Grid
          item
          paddingX="1rem"
          xs={12}
          md={7}
          marginTop={{ xs: '2rem', md: '5rem' }}
        >
          <div style={{ display: 'flex' }}>
            <Typography
              variant="h6"
              flexGrow={1}
              style={{ wordBreak: 'break-word' }}
            >
              {ad.title}
            </Typography>
            <Typography
              variant="h6"
              style={styles.price}
              sx={{ display: 'flex' }}
            >
              {getFormattedPrice(ad.price)}
              <span style={{ fontSize: 'small', marginLeft: '5px' }}> $</span>
            </Typography>
          </div>

          {ad.description && (
            <>
              <Divider sx={{ marginY: '2rem' }} />
              {/* <Typography fontSize="1.10rem">Description :</Typography> */}
              <Typography
                marginTop={'1rem'}
                color="#cccac3"
                whiteSpace="pre-line"
              >
                {ad.description}
                {/* {lorem} {lorem}{lorem} */}
              </Typography>
            </>
          )}

          <Divider sx={{ marginY: '2rem' }} />

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ marginRight: '1rem' }}>Y</Avatar>
            <div style={{ flexGrow: 1, cursor: 'pointer' }}>
              <Typography>Tarak Bouhlel</Typography>
              <Typography variant="subtitle2">
                {ad.user?.totalAds} Items
              </Typography>
            </div>

            <Button
              disableRipple
              variant="outlined"
              style={styles.contactButton}
            >
              Contact
            </Button>
          </div>

          <Divider sx={{ marginY: '2rem' }} />
        </Grid>
      </Grid>
    </>
  );
}

export default AdDetails;

const styles = {
  gridContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    textAlign: 'start',
    backgroundColor: '#282b2b',
    position: 'relative',
    minHeight: '87vh',
  },

  mainCard: {
    display: 'flex',
    alignItems: 'center',
  },
  price: {
    marginLeft: '3rem',
    alignSelf: 'center',
    color: 'darkorange',
  },
  contactButton: {
    // backgroundColor: 'darkOrange',
    borderColor: 'darkorange',
    color: 'white',
    fontWeight: 'bold',
  },
};
