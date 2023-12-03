import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { logOut } from '../../../store/reducers/user-slice';
import { useAppDispatch } from '../../../hooks/redux';
import { ADMIN, CLIENTS_SECTION, LEADS_SECTION, WORKERS_SECTION, checkRights } from '../../../utils/rights-utils';


type PropsType = {
  rights: string[];
}

export const Header: React.FC<PropsType> = ({ rights }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogOutClick = () => {
    dispatch(logOut())
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GoffieSchool
          </Typography>

          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' }
          }}>

            {checkRights(rights, WORKERS_SECTION) && (
              <Link to="/workers">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Workers
                </Button>
              </Link>
            )}

            {checkRights(rights, CLIENTS_SECTION) && (
              <Link to="/clients">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Clients
              </Button>
            </Link>
            )}

            {checkRights(rights, LEADS_SECTION) && (
              <Link to="/leads">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Leads
                </Button>
              </Link>
            )}

            {checkRights(rights, ADMIN) && (
              <Link to="/roles">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Roles
                </Button>
              </Link>
            )}


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <Link to='/'>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>

              <Link to='/log-in'>
                <MenuItem onClick={onLogOutClick}>
                  <Typography textAlign="center">Log-out</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
