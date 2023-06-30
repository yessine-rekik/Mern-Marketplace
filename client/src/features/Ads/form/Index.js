import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import { useNavigate } from 'react-router-dom';
import { Done } from '@mui/icons-material';
import { fetchCategories } from '../api';

const stepsLabels = ['General informations', 'Images'];
function Index() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const prev = () => {
    setStep((step) => step - 1);
  };

  const next = () => {
    setStep((step) => step + 1);
  };

  const handleDataChange = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Step1
            data={data}
            handleDataChange={handleDataChange}
            categories={categories}
            next={next}
          />
        );
      case 1:
        return (
          <Step2
            data={data}
            prev={prev}
            next={next}
            handleDataChange={handleDataChange}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          maxWidth: 'sm',
          padding: 2,
          borderRadius: 3,
          backgroundColor: '#282b2b',
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          Create new listing
        </Typography>
        <Stepper activeStep={step} sx={{ pt: 3, pb: 5 }}>
          {stepsLabels.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === stepsLabels.length ? (
          <>
            <Done color="success" />
            <Typography variant="subtitle1" gutterBottom>
              Your listing has been successfully submitted!
            </Typography>

            <Button sx={{ marginY: '1rem' }} onClick={() => navigate('/')}>
              Back
            </Button>
          </>
        ) : (
          getStepContent(step)
        )}
      </Box>
    </div>
  );
}

export default Index;
