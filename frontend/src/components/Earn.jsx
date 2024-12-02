import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Grid,
  MenuItem,
  InputAdornment,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Earn = () => {
  // Currency options
  const currencies = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' }
  ];

  // Initial state
  const [experiences, setExperiences] = useState([
    {
      years: '',
      jobTitle: '',
      salary: '',
      country: '',
      currency: 'USD'
    }
  ]);
  const [salaryAnalysis, setSalaryAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handlers
  const handleAddExperience = () => {
    if (experiences.length < 5) {
      setExperiences([...experiences, {
        years: '',
        jobTitle: '',
        salary: '',
        country: '',
        currency: 'USD'
      }]);
    }
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jobboard-api-ur9k.onrender.com/api/analyze-salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify({ experiences }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSalaryAnalysis(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to analyze salary data. Please try again.');
    } finally {
      setIsLoading(false);
    }
};

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Salary Insights
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Enter your work experience details to get personalized salary insights
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        {experiences.map((exp, index) => (
          <Card key={index} sx={{ mb: 2, position: 'relative' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Years of Experience"
                    type="number"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                    InputProps={{ inputProps: { min: 0, max: 50 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    label="Annual Salary"
                    type="number"
                    value={exp.salary}
                    onChange={(e) => handleExperienceChange(index, 'salary', e.target.value)}
                    InputProps={{
                      inputProps: { min: 0 },
                      startAdornment: (
                        <InputAdornment position="start">
                          {currencies.find(c => c.value === exp.currency)?.symbol}
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Currency"
                    value={exp.currency}
                    onChange={(e) => handleExperienceChange(index, 'currency', e.target.value)}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Country"
                    value={exp.country}
                    onChange={(e) => handleExperienceChange(index, 'country', e.target.value)}
                  />
                </Grid>
              </Grid>
              {experiences.length > 1 && (
                <IconButton
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  onClick={() => handleRemoveExperience(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}

        {experiences.length < 5 && (
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddExperience}
            sx={{ mt: 2 }}
          >
            Add Experience
          </Button>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Salary'}
        </Button>
      </Box>

      {salaryAnalysis && !error && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Salary Analysis Results
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Suggested Salary Range (USD)
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                ${Math.round(salaryAnalysis.minSalary).toLocaleString()} - ${Math.round(salaryAnalysis.maxSalary).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Average Market Salary: ${Math.round(salaryAnalysis.avgSalary).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                * All amounts are shown in USD for consistency
              </Typography>
            </Box>

            <Box sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.03)', 
        p: 2, 
        borderRadius: 1 
      }}>
        <Typography variant="h6" gutterBottom>
          Negotiation Recommendation
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-line',
            lineHeight: 1.6
          }}
        >
          {/* Clean up the recommendation text by removing any JSON formatting */}
          {typeof salaryAnalysis.recommendation === 'string' 
            ? salaryAnalysis.recommendation
                .replace(/[{}"]/g, '') // Remove JSON brackets and quotes
                .replace(/\\n/g, '\n') // Convert \n to actual line breaks
                .trim()
            : salaryAnalysis.recommendation}
        </Typography>
      </Box>
    </CardContent>
  </Card>
)}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Earn;