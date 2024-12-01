import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Import your logo

const Navbar = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box 
          component="img"
          src={logo}
          alt="JobsScout Logo"
          onClick={handleTitleClick}
          sx={{ 
            height: 80,  // Adjust this value to match your logo's desired height
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
        />
        <div>
          <Button color="inherit" component={Link} to="/jobs">
            Find
          </Button>
          <Button color="inherit" component={Link} to="/explore">
            Evolve
          </Button>
          <Button color="inherit" component={Link} to="/earn">
            Earn
          </Button>
          <Button color="inherit" component={Link} to="/prepare">
  Prepare
</Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;