import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from './validation';
import { FormatLineSpacing } from '@mui/icons-material';

function Step1({ data, categories, handleDataChange, next }) {
  const [fieldsIntertactedWith, setFieldsInteractedWith] = useState({});

  const formik = useFormik({
    initialValues: { ...data },
    validationSchema,
    onSubmit: () => {
      next();
    },
  });

  const handleChange = (event) => {
    const { name } = event.target;
    if (name === 'price' && !/^(?:[1-9]\d{0,9})?$/.test(event.target.value))
      return;
    if (name === 'category') delete formik.values.subcategory;
    formik.handleChange(event);
    handleDataChange(name, event.target.value);

    if (!fieldsIntertactedWith[name]) {
      setFieldsInteractedWith((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };
  const getHelperText = (fieldName) => {
    if (fieldsIntertactedWith[fieldName] || formik.touched[fieldName])
      return formik.errors[fieldName];
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            sx={{ width: '80%' }}
            multiline
            label="Title *"
            name="title"
            value={formik.values.title}
            onChange={handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={getHelperText('title')}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ width: '80%' }}
            multiline
            minRows={5}
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={handleChange}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     formik.setFieldValue(
            //       'description',
            //       `${formik.values.description}\n`
            //     );

            //     console.log(formik.values.description);
            //   }
            // }}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={getHelperText('description')}
          />
        </Grid>

        <Grid item xs={12} marginBottom="1rem">
          <TextField
            sx={{ width: '30%' }}
            label="Price *"
            name="price"
            value={formik.values.price}
            onChange={handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={getHelperText('price')}
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Category *"
            name="category"
            select
            fullWidth
            type="number"
            value={formik.values.category}
            onChange={handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={getHelperText('category')}
          >
            {categories.map((categ) => (
              <MenuItem key={categ._id} value={categ._id}>
                {categ.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Subcategory"
            name="subcategory"
            select={Boolean(formik.values.category) || false}
            fullWidth
            value={formik.values.subcategory || ''}
            onChange={handleChange}
            error={
              formik.touched.subcategory && Boolean(formik.errors.subcategory)
            }
            helperText={getHelperText('subcategory')}
            disabled={!formik.values.category}
          >
            {categories
              .find((categ) => categ._id === formik.values.category)
              ?.subcategories.map((subcateg) => (
                <MenuItem key={subcateg._id} value={subcateg._id}>
                  {subcateg.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" marginTop="2rem">
        <Button
          variant="outlined"
          onClick={formik.handleSubmit}
          sx={{ marginLeft: '1rem', color: 'white' }}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default Step1;
