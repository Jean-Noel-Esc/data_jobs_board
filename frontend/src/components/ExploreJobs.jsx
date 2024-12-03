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

    {suggestions.length > 0 && (
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Suggested Roles:
        </Typography>
        {suggestions.map((suggestion, index) => (
  <Card key={index} sx={{ mb: 3, p: 2 }}>
    <CardContent>
      {/* Titre du poste */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography 
          component="span" 
          sx={{ color: 'primary.main', fontWeight: 'bold', mr: 1 }}
        >
          Title:
        </Typography>
        <Typography 
          variant="h6" 
          component="span"
          sx={{ ml: 1 }}  // Ajout d'une marge à gauche
        >
          {suggestion.title || "Marketing Analyst"}  // Le titre suggéré sera affiché ici
        </Typography>
      </Box>

      {/* Description avec sections numérotées */}
      <Box>
        <Typography 
          component="span" 
          sx={{ color: 'primary.main', fontWeight: 'bold', display: 'block', mb: 1 }}
        >
          Description:
        </Typography>
        <Box sx={{ pl: 2 }}>
          {suggestion.description.split(/\d\./).map((section, idx) => {
            if (idx === 0) return null;
            return (
              <Box key={idx} sx={{ mb: 2 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    display: 'flex',
                    '&:before': {
                      content: `"${idx}."`,
                      minWidth: '25px',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  {section.trim()}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Match Commentary */}
      {suggestion.match && (
        <Box sx={{ mt: 2, bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
          <Typography 
            variant="body1" 
            sx={{ color: 'white', fontStyle: 'italic' }}
          >
            Match Analysis: {suggestion.match}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
))}
      </Box>
    )}

    </Container>
  );
};

export default ExploreJobs;