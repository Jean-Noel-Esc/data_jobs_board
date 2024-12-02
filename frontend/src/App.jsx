import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Typography, Container } from '@mui/material';
import theme from './theme.js';
import Navbar from "./components/Navbar";
import JobList from "./components/JobList";
import ExploreJobs from "./components/ExploreJobs";
import Prepare from './components/Prepare';
import Earn from "./components/Earn";



import About from "./components/About";
import logolgo from './assets/images/logolgo.png'; // Import the logo

const Welcome = () => {
  return (
    <Container maxWidth="lg" sx={{ 
      padding: '40px 20px',
      textAlign: 'center',
      minHeight: 'calc(100vh - 64px)', // Full height minus navbar
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3
        }}
      >
        Welcome to Jobs Scout
      </Typography>
      <Typography 
        variant="h5" 
        color="text.secondary"
        sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}  // Added margin bottom
      >
        Your journey to finding the perfect job starts here
      </Typography>
      <Box
        component="img"
        src={logolgo} 
        alt="JobsScout Logo"
        sx={{
          width: '300px',  // Adjust this value as needed
          height: 'auto',
          mt: 4  // Adds margin top
        }}
      />
    </Container>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box sx={{ width: '100%', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/explore" element={<ExploreJobs />} />
            <Route path="/earn" element={<Earn />} /> 
            <Route path="/prepare" element={<Prepare />} /> 
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Welcome />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;