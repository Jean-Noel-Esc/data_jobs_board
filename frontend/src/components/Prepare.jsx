import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CreateIcon from '@mui/icons-material/Create';
import UpdateResume from './resume/UpdateResume';
import ImproveResume from './resume/ImproveResume';
import CreateResume from './resume/CreateResume';

const Prepare = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'update':
        return <UpdateResume onBack={() => setSelectedOption(null)} />;
      case 'improve':
        return <ImproveResume onBack={() => setSelectedOption(null)} />;
      case 'create':
        return <CreateResume onBack={() => setSelectedOption(null)} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {!selectedOption ? (
        <>
          <Typography variant="h4" gutterBottom align="center">
            Prepare Your Resume
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
                onClick={() => setSelectedOption('update')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <UpdateIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Update Resume
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update your existing resume with new information while maintaining its style
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
                onClick={() => setSelectedOption('improve')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <AutoFixHighIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Improve Resume
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enhance your current resume with better phrasing and layout options
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
                onClick={() => setSelectedOption('create')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <CreateIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Create Resume
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Build a new resume from scratch with our guided process
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        renderSelectedComponent()
      )}
    </Container>
  );
};

export default Prepare;