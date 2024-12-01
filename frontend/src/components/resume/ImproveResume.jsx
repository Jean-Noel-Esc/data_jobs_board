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

const ImproveResume = ({ onBack }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

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
        Improve Your Resume
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <input
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="resume-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="resume-file">
            <Button variant="contained" component="span">
              Upload Current Resume
            </Button>
          </label>
          
          {file && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Selected file: {file.name}
            </Typography>
          )}
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ImproveResume;