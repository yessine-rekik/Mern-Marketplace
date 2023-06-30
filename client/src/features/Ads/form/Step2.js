import { AddAPhotoOutlined, Close, CopyAll } from '@mui/icons-material';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { postAd } from '../api';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

function Step2({ data, next, prev, handleDataChange }) {
  const [uploadedImages, setUploadedImages] = useState(data.images);
  const [isPosting, setIsPosting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    handleDataChange('images', uploadedImages);
  }, [uploadedImages]);

  const handleFileChange = (event) => {
    if (uploadedImages.length === 9) return;

    const files = event.target.files;
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );
    setUploadedImages((uploadedImages) => [
      ...uploadedImages,
      ...imageFiles
        .filter(
          (image) =>
            !uploadedImages.some(
              (existingImage) => existingImage.name === image.name
            )
        )
        .slice(0, 9 - uploadedImages.length),
    ]);
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (image) => {
    setUploadedImages((uploadedImages) =>
      uploadedImages.filter((img) => img.name !== image.name)
    );
  };

  const handleSubmit = async () => {
    if (!uploadedImages.length) return setOpenSnackbar(true);

    setIsPosting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case 'category':
          formData.append('categoryId', value);
          break;
        case 'subcategory':
          if (data.subcategory) formData.append('subcategoryId', value);
          break;
        case 'images':
          data.images.forEach((img) => {
            formData.append('images', img);
          });
          break;
        case 'description':
          if (value.trim()) formData.append(key, value.trim());
          break;
        default:
          formData.append(key, value);
          break;
      }
    });

    postAd(axiosPrivate, formData)
      .then(() => next())
      .catch(() => setIsPosting(false));
  };
  return isPosting ? (
    <>
      <Typography variant="h6" marginBottom="1rem">
        Upload in progress...
      </Typography>
      <CircularProgress size={30} sx={{ marginBottom: '1rem' }} />
    </>
  ) : (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            position={'relative'}
            border="dashed 3px #1475cf"
            borderRadius="10px"
            height={125}
            justifyContent={'center'}
            alignItems="center"
            display="flex"
            flexDirection="column"
            sx={{ cursor: 'pointer' }}
            onClick={handleBoxClick}
          >
            <AddAPhotoOutlined sx={{ marginBottom: '1rem' }} />
            <Typography>Upload Images</Typography>
            <input
              multiple
              hidden
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Typography
              color={uploadedImages.length ? 'green' : 'red'}
              position={'absolute'}
              bottom={0}
              right={0}
              marginBottom={1}
              marginRight={1.5}
            >
              {uploadedImages.length} / 9
            </Typography>
          </Box>
        </Grid>

        {uploadedImages.length > 0 &&
          uploadedImages.map((image, index) => (
            <Grid item xs={4} key={index} position="relative">
              <Card>
                <CardMedia
                  component="img"
                  height={125}
                  image={URL.createObjectURL(image)}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: 'black',
                  }}
                />
              </Card>
              <IconButton
                size="small"
                onClick={() => handleDelete(image)}
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                }}
              >
                <Badge badgeContent="✖" color="error" overlap="circular" />
              </IconButton>
            </Grid>
          ))}
      </Grid>
      <Box display="flex" justifyContent="flex-end" marginTop="2rem">
        <Button onClick={prev}>Back</Button>
        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit}
          sx={{ marginLeft: '1rem', color: 'white' }}
        >
          Submit
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSnackbar(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          Listing must have at least one image.
        </Alert>
      </Snackbar>
    </>
  );
}

export default Step2;
