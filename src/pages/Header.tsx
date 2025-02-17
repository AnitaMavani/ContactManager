import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Auth from './Auth';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate(); 
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

   // Handle login/register click
   const handleAuthPage = (isRegister: boolean) => {
    navigate(isRegister ? '/register' : '/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component={NavLink}
          to="/"
          className="nav-logo"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Logo
        </Typography>

        {/* Mobile Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="open navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                component={NavLink}  // Make MenuItem render as NavLink
                to={page.path}
                onClick={handleCloseNavMenu}
                className='menu-item'
                // Apply className for active links
                //className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>
          <div>
          </div>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              component={NavLink}  // Make Button render as NavLink
              to={page.path}
              className='menu-item'
              // Apply className for active links
              //className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <div>
        <Button
            component={NavLink}
            to="/login"
            variant="contained"
            color="success"
            sx={{mr:2}}
            onClick={() => handleAuthPage(false)} // Navigate to login
          >
            Login
          </Button>
          <Button
            component={NavLink}
            to="/register"
            variant="contained"
            color="success"
            sx={{mr:2}}
            onClick={() => handleAuthPage(false)} 
          >
            Register
          </Button>
          </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
