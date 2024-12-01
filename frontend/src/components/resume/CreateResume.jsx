import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateResume = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={onBack}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Create New Resume
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Let's create your resume step by step
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default CreateResume;