import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Card, 
  CardContent,
  CircularProgress
} from '@mui/material';

const ExploreJobs = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://jobboard-api-ur9k.onrender.com/api/explore-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        mode: 'cors',  // Ajout important
        credentials: 'same-origin',
        body: JSON.stringify({ description: jobDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Explore Job Opportunities
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Describe your current role and responsibilities, and we'll suggest relevant job titles that match your skills
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Describe your current role and responsibilities"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          disabled={loading || !jobDescription.trim()}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Get Job Suggestions'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      {suggestions.map((suggestion, index) => (
  <Card key={index} sx={{ mb: 3, p: 3, backgroundColor: '#f8f9fa' }}>
    <CardContent>
      {/* En-tête avec le titre */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'baseline',
        mb: 3,
        borderBottom: '1px solid #e0e0e0',
        pb: 2
      }}>
        <Typography 
          component="span" 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            mr: 2
          }}
        >
          Title:
        </Typography>
        <Typography 
          variant="h6" 
          component="span"
          sx={{ 
            fontWeight: '500',
            color: '#2c3e50'
          }}
        >
          {suggestion.title}
        </Typography>
      </Box>

      {/* Section Description */}
      <Box>
        <Typography 
          component="span" 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            display: 'block',
            mb: 2
          }}
        >
          Description:
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            pl: 2,
            lineHeight: 1.6,
            color: '#34495e'
          }}
        >
          {suggestion.description}
        </Typography>
      </Box>

      {/* Match Commentary si présent */}
      {suggestion.match && (
        <Box sx={{ 
          mt: 3,
          bgcolor: 'primary.light',
          p: 2,
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white',
              fontStyle: 'italic'
            }}
          >
            Match Analysis: {suggestion.match}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
))}


    </Container>
  );
};

export default ExploreJobs;