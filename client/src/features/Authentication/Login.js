import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import {
  Box,
  Button,
  IconButton,
  TextField,
  Link,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  useNavigate,
  useLocation,
  Navigate,
  Link as RouterLink,
} from 'react-router-dom';
import axios from '../../config/axios';
import useAuth from '../../hooks/useAuth';

import { validationSchema } from './loginValidation';

function Login() {
  const [fieldsIntertactedWith, setFieldsInteractedWith] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/login', values);

        const { accessToken } = response.data;
        setToken(accessToken);

        alert('Submitted');

        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } catch (err) {
        const { response } = err;
        if (response && response.status === 401) {
          if (response.data.username)
            formik.setFieldError('username', 'Invalid username');
          else if (response.data.password)
            formik.setFieldError('password', 'Invalid password');
        }
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

  return token ? (
    <Navigate to="/" replace />
  ) : (
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

      {/* <FormControlLabel
        sx={{ pt: '1rem' }}
        control={
          <Checkbox
            defaultChecked={true}
            // checked={false}
          />
        }
        label="Remember me"
      /> */}
      <br />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button component={RouterLink} to="/register" underline="none">
          Register
        </Button>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </form>
  );
}

export default Login;
