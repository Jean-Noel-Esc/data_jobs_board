import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  IconButton,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const UpdateResume = ({ onBack }) => {
  // State management
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeResumeVersion, setActiveResumeVersion] = useState(0);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    experience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        school: '',
        degree: '',
        field: '',
        graduationDate: ''
      }
    ],
    skills: ''
  });

  const steps = ['Upload Resume', 'Update Content', 'Choose Version'];

  // File upload handler
  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data from backend
      setResumeData({
        personalInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          location: 'New York, NY'
        },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Software Engineer',
            startDate: '2020-01',
            endDate: '2023-01',
            description: 'Developed web applications using React and Node.js'
          }
        ],
        education: [
          {
            school: 'University of Technology',
            degree: 'Bachelor',
            field: 'Computer Science',
            graduationDate: '2020'
          }
        ],
        skills: 'React, Node.js, Python, SQL'
      });

      setActiveStep(1);
    } catch (err) {
      setError('Failed to process resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Form update handler
  const handleUpdateField = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (section === 'personalInfo') {
        newData.personalInfo[field] = value;
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  // Generate resume handler
  const handleGenerateUpdatedResume = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActiveStep(2);
    } catch (err) {
      setError('Failed to generate updated resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Carousel navigation handlers
  const handleNext = () => {
    setActiveResumeVersion(prev => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setActiveResumeVersion(prev => Math.max(prev - 1, 0));
  };

  // Download handler
  const handleDownload = (version) => {
    console.log(`Downloading version ${version + 1}`);
  };

  // Render different steps
  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <input
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="resume-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="resume-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                size="large"
              >
                Upload Current Resume
              </Button>
            </label>
            {file && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                Selected file: {file.name}
              </Typography>
            )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            {/* Personal Information */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => handleUpdateField('personalInfo', 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handleUpdateField('personalInfo', 'email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => handleUpdateField('personalInfo', 'phone', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => handleUpdateField('personalInfo', 'location', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                {resumeData.experience.map((exp, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company"
                        value={exp.company}
                        onChange={(e) => handleUpdateField('experience', 'company', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Position"
                        value={exp.position}
                        onChange={(e) => handleUpdateField('experience', 'position', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateField('experience', 'startDate', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="End Date"
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateField('experience', 'endDate', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        value={exp.description}
                        onChange={(e) => handleUpdateField('experience', 'description', e.target.value, index)}
                      />
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                {resumeData.education.map((edu, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="School"
                        value={edu.school}
                        onChange={(e) => handleUpdateField('education', 'school', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => handleUpdateField('education', 'degree', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Field of Study"
                        value={edu.field}
                        onChange={(e) => handleUpdateField('education', 'field', e.target.value, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Graduation Date"
                        type="month"
                        value={edu.graduationDate}
                        onChange={(e) => handleUpdateField('education', 'graduationDate', e.target.value, index)}
                      />
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Skills"
                  value={resumeData.skills}
                  onChange={(e) => handleUpdateField('skills', null, e.target.value)}
                  helperText="Enter your skills, separated by commas"
                />
              </CardContent>
            </Card>

            <Button
              variant="contained"
              onClick={handleGenerateUpdatedResume}
              startIcon={<SaveIcon />}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Generate Updated Resume
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
              Choose Your Preferred Resume Version
            </Typography>
            
            <Box sx={{ maxWidth: 900, margin: 'auto', position: 'relative' }}>
              <Card sx={{ m: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom align="center">
                    Version {activeResumeVersion + 1}
                  </Typography>
                  
                  {/* Resume Preview */}
                  <Box
                    sx={{
                      height: 500,
                      backgroundColor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Replace with actual resume preview */}
                    <Typography variant="body1" color="text.secondary">
                      Resume Preview {activeResumeVersion + 1}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      startIcon={<PreviewIcon />}
                      onClick={() => {/* Add preview logic */}}
                    >
                      Preview Full Resume
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownload(activeResumeVersion)}
                    >
                      Download This Version
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Navigation Arrows */}
              <IconButton
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'grey.200' },
                  boxShadow: 2
                }}
                onClick={handleBack}
                disabled={activeResumeVersion === 0}
              >
                <KeyboardArrowLeft />
              </IconButton>
              
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'grey.200' },
                  boxShadow: 2
                }}
                onClick={handleNext}
                disabled={activeResumeVersion === 2}
              >
                <KeyboardArrowRight />
              </IconButton>

              {/* Version Indicators */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                {[0, 1, 2].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      mx: 0.5,
                      backgroundColor: index === activeResumeVersion ? 'primary.main' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                    onClick={() => setActiveResumeVersion(index)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={onBack}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Update Your Resume
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {renderContent()}
    </Container>
  );
};

export default UpdateResume;