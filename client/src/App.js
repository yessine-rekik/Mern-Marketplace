import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/Authentication/Login';
import Register from './features/Authentication/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';
import {
  Container,
  CssBaseline,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Protected from './components/Protected';
import Protect from './components/Protect';
import Header from './components/Header';
import Chat from './features/Chat/Index';
import AdsList from './features/Ads/AdsList';
import Index from './features/Ads/form/Index';
import AdDetails from './features/Ads/AdDetails';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#1d1d1d',
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Container
        component="main"
        sx={{
          height: '100%',
          paddingTop: '5rem',
          paddingBottom: '1rem',
        }}
      >
        <Routes>
          {/* Protected routes */}
          <Route element={<Protect />}>
            <Route path="/protected" element={<Protected />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/newlisting" element={<Index />} />
            <Route path="/favorites" element={<h2>Favorites</h2>} />
            <Route path="/profile" element={<h2>Profile</h2>} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/ads" element={<AdsList />} />
          <Route path="/ads/:id" element={<AdDetails />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
