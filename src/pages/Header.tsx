import React, { useContext } from 'react';
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
import { AuthContext } from './AuthContext';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useContext(AuthContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAuthPage = (isRegister: boolean) => {
    navigate(isRegister ? '/register' : '/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
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
                component={NavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                className='menu-item'
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              component={NavLink}
              to={page.path}
              className='menu-item'
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

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Welcome, {userName}!
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box display="flex" gap={2}>
            <Button
              component={NavLink}
              to="/login"
              variant="contained"
              color="success"
              onClick={() => handleAuthPage(false)}
            >
              Login
            </Button>
            <Button
              component={NavLink}
              to="/register"
              variant="contained"
              color="success"
              onClick={() => handleAuthPage(true)}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;