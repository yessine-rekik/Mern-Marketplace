import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Skeleton,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  CopyAll,
  FavoriteBorder,
  FlagOutlined,
  Close,
  LocationCity,
  LocationOn,
  LocationOnOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getFormatedDate } from './utils';
import { getFormattedPrice } from '../../utils/getFormattedPrice';

export default function AdCard({ ad }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      <Grid item xs={6} sm={4} md={3} lg={12 / 5}>
        <Link
          component={RouterLink}
          to={`/ads/${ad._id}`}
          state={{ ad }}
          underline="none"
          color="text.primary"
        >
          <Card sx={{ backgroundColor: '#212121' }}>
            {isImageLoading && (
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height={250}
              />
            )}
            <CardMedia
              id={ad._id}
              height={250}
              component="img"
              onLoad={() => {
                setIsImageLoading(false);
              }}
              image={ad.images[0]}
              alt="image"
              style={styles.cardMedia}
              sx={{ display: isImageLoading ? 'none' : 'block' }}
            />

            <Box
              style={{
                textAlign: 'start',
                margin: '0.5rem 1rem',
              }}
            >
              <Typography
                variant="body1"
                style={styles.price}
                sx={{ display: 'flex' }}
              >
                {getFormattedPrice(ad.price)}
                <span style={styles.price.currency}>$</span>
              </Typography>

              <Typography style={styles.title}>{ad.title}</Typography>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LocationOnOutlined style={styles.placeAndTime.icon} />
                <Typography style={styles.placeAndTime.text}>
                  Static place
                </Typography>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AccessTimeOutlined style={styles.placeAndTime.icon} />
                <Typography style={styles.placeAndTime.text}>
                  {getFormatedDate(ad.updatedAt)}
                </Typography>
              </div>
            </Box>
          </Card>
        </Link>
      </Grid>
    </>
  );
}

const styles = {
  cardMedia: {
    objectFit: 'contain',
    backgroundColor: '#121212',
  },
  price: {
    marginLeft: '0.5rem',
    color: 'darkorange',
    currency: {
      fontSize: 'small',
      marginLeft: '5px',
    },
  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: '1rem',
  },
  placeAndTime: {
    icon: {
      color: 'gray',
      fontSize: '1rem',
      marginRight: '0.25rem',
    },
    text: {
      color: 'gray',
      fontSize: 'small',
    },
  },
};
