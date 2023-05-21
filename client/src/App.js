import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/Authentication/Login';
import Register from './features/Authentication/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { ThemeProvider, createTheme } from '@mui/material';
import Protected from './components/Protected';
import Protect from './components/Protect';
import Header from './components/Header';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <Header />
          <Routes>
            {/* Protected routes */}
            <Route element={<Protect />}>
              <Route path="/protected" element={<Protected />} />
              <Route path="/protected2" element={<Protected />} />
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
