import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, MenuItem, Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import JobCard from './JobCard';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [showSelected, setShowSelected] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    workType: '',
    date: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
        setFilteredJobs([]);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    if (filters.keyword.trim()) {
      filtered = filtered.filter(job =>
        job['Job Title'].toLowerCase().includes(filters.keyword.toLowerCase().trim())
      );
    }

    if (filters.location.trim()) {
      filtered = filtered.filter(job =>
        job.Location.toLowerCase().includes(filters.location.toLowerCase().trim())
      );
    }

    if (filters.workType) {
      filtered = filtered.filter(job =>
        job['Work Type'] === filters.workType
      );
    }

    if (filters.date) {
      filtered = filtered.filter(job =>
        job['Posted Date'] === filters.date
      );
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleToggleSelect = (jobId) => {
    setSelectedJobs(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(jobId)) {
        newSelected.delete(jobId);
      } else {
        newSelected.add(jobId);
      }
      return newSelected;
    });
  };

  const handleDownloadCSV = () => {
    const jobsToDownload = jobs.filter(job => selectedJobs.has(job['Job ID']));
    
    const headers = ['Job Title', 'Company Name', 'Location', 'Work Type', 'Posted Date', 'Job URL'];
    const csvContent = [
      headers.join(','),
      ...jobsToDownload.map(job => [
        `"${job['Job Title']}"`,
        `"${job['Company Name']}"`,
        `"${job.Location}"`,
        `"${job['Work Type']}"`,
        `"${job['Posted Date']}"`,
        `"${job['Job URL']}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'selected_jobs.csv';
    link.click();
  };

  // Determine which jobs to display based on the selected state
  const displayedJobs = showSelected 
    ? filteredJobs.filter(job => selectedJobs.has(job['Job ID']))
    : filteredJobs;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">
          Found {displayedJobs.length} jobs
          {showSelected && ` (${selectedJobs.size} selected)`}
        </Typography>
        
        <Button
          variant={showSelected ? "contained" : "outlined"}
          startIcon={<BookmarkIcon />}
          onClick={() => setShowSelected(!showSelected)}
        >
          {showSelected ? "Show All" : "Show My Selected Jobs"}
        </Button>

        {selectedJobs.size > 0 && showSelected && (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCSV}
          >
            Download Selected
          </Button>
        )}
      </Box>

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Keyword"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            fullWidth
            placeholder="e.g. Data Analyst"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            fullWidth
            placeholder="e.g. Paris"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Work Type"
            name="workType"
            value={filters.workType}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Onsite">Onsite</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Posted Date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleFilterChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job) => (
            <Grid item xs={12} key={job['Job ID']}>
              <JobCard 
                title={job['Job Title']}
                company={job['Company Name']}
                location={job.Location}
                url={job['Job URL']}
                logo={job['Company Logo']}
                workType={job['Work Type']}
                postedDate={job['Posted Date']}
                responseTime={job['Response Time'] || 'No response time available'}
                isSelected={selectedJobs.has(job['Job ID'])}
                onToggleSelect={handleToggleSelect}
                jobId={job['Job ID']}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              {showSelected ? "No jobs selected" : "No jobs found matching your criteria"}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default JobList;