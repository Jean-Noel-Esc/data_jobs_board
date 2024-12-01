import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Link, Checkbox } from '@mui/material';

const JobCard = ({ 
    title, 
    company, 
    location, 
    url,
    logo,
    workType,
    postedDate,
    responseTime,
    isSelected,
    onToggleSelect,
    jobId // Add this prop
}) => {
    return (
        <Card sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
                <Box display="flex" alignItems="flex-start" gap={2}>
                    <Checkbox
                        checked={isSelected}
                        onChange={() => onToggleSelect(jobId)}
                        sx={{ mt: 1 }}
                    />
                    <Avatar 
                        src={logo} 
                        alt={company}
                        sx={{ width: 56, height: 56 }}
                    />
                    <Box flex={1}>
                        <Link href={url} target="_blank" underline="hover">
                            <Typography variant="h6" gutterBottom>
                                {title}
                            </Typography>
                        </Link>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            📍 {location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            🏢 {workType}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            📅 Posted: {postedDate}
                        </Typography>
                        {responseTime && (
                            <Typography variant="body2" color="text.secondary">
                                ⏱️ {responseTime}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobCard;