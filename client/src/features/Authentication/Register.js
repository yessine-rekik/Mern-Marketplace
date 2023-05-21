import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';

import { Button, IconButton, TextField, Link, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import axios from '../../config/axios';
import useAuth from '../../hooks/useAuth';

import { validate, validationSchema } from './registerValidation';

function Register() {
  const [fieldsIntertactedWith, setFieldsInteractedWith] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validate,
    onSubmit: async (values) => {
      const { confirmPassword, ...credentials } = values;
      try {
        const response = await axios.post('/register', credentials);

        const { accessToken } = response.data;
        setToken(accessToken);

        alert('Submitted');
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleChange = (event) => {
    const { name } = event.target;
    formik.handleChange(event);

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
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        // required
        label="Username *"
        name="username"
        value={formik.values.username}
        onChange={handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={getHelperText('username')}
      />
      <br />
      <TextField
        type={showPassword ? 'text' : 'password'}
        label="Password *"
        name="password"
        value={formik.values.password}
        onChange={handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={getHelperText('password')}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword((showPassword) => !showPassword)}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
      />

      <br />
      <TextField
        type={showConfirmPassword ? 'text' : 'password'}
        disabled={!!formik.errors.password || !formik.values.password}
        label="Password confirmation *"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={getHelperText('confirmPassword')}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() =>
                setShowConfirmPassword(
                  (showConfirmPassword) => !showConfirmPassword
                )
              }
              edge="end"
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
      />
      <br />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button component={RouterLink} to="/login" underline="none">
          Login
        </Button>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </form>
  );
}

export default Register;
