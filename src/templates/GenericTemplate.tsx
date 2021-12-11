import { AccountCircle, ChevronLeft, Menu, VerifiedUser, Warning } from '@mui/icons-material';
import {
  AppBar as MuiAppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link as RrLink } from 'react-router-dom';

import Copyright from '../components/Copyright';
import { constants } from '../constants';
import { getRoute } from '../routes';
import { AppState } from '../stores/root';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: constants.value.drawerWidth,
    width: `calc(100% - ${constants.value.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: constants.value.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const Link = styled(RrLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
}));

const GenericTemplate = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [t] = useTranslation();
  const { user } = useSelector((state: AppState) => state.auth);

  const anchorRef = useRef(null);

  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const openDrawer = () => setDrawerOpened(true);
  const closeDrawer = () => setDrawerOpened(false);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const openPopup = () => setIsOpenPopup(true);
  const closePopup = () => setIsOpenPopup(false);

  const drawerlinks = [getRoute('home'), getRoute('account')];
  const popuplinks = [getRoute('account'), getRoute('signout')];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="absolute" open={drawerOpened}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            sx={{
              marginRight: '36px',
              ...(drawerOpened && { display: 'none' }),
            }}
            data-testid="hamburger-button"
          >
            <Menu />
          </IconButton>
          <Title variant="h6" color="inherit" noWrap data-testid="title">
            {constants.app.name}
          </Title>

          <div style={{ flex: '1 0 0' }} />

          <IconButton onClick={openPopup} ref={anchorRef} sx={{ color: 'white' }} data-testid="account-button">
            <AccountCircle />
          </IconButton>
          <Popover
            anchorEl={anchorRef.current}
            open={isOpenPopup}
            onClose={closePopup}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            data-testid="account-popup"
          >
            <Grid container sx={{ p: 2 }}>
              <Grid item xs={3}>
                {user?.verified ? (
                  <Tooltip title={<>{t('label.verifiedAccount')}</>}>
                    <VerifiedUser color="primary" sx={{ m: 1 }} data-testid="user-verified-icon" />
                  </Tooltip>
                ) : (
                  <Tooltip title={<>{t('message.error.accountUnverified')}</>}>
                    <Warning color="error" sx={{ m: 1 }} data-testid="user-unverified-icon" />
                  </Tooltip>
                )}
              </Grid>
              <Grid item xs={9}>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" color="textPrimary" noWrap data-testid="user-name">
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap data-testid="user-email">
                    {user?.email}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Box>
              {popuplinks.map((route) =>
                route ? (
                  <Link to={route.path}>
                    <ListItem button>
                      <ListItemIcon>{route.icon}</ListItemIcon>
                      <ListItemText primary={t(`title.${route.id}`)} />
                    </ListItem>
                  </Link>
                ) : (
                  <Divider />
                )
              )}
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={drawerOpened} data-testid="drawer">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: [1],
          }}
        >
          <IconButton onClick={closeDrawer} data-testid="close-drawer-button">
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <List data-testid="menu-item">
          {drawerlinks.map((route) =>
            route ? (
              <Link to={route.path}>
                <Tooltip title={<>{t(`title.${route.id}`)}</>}>
                  <ListItem button>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={t(`title.${route.id}`)} />
                  </ListItem>
                </Tooltip>
              </Link>
            ) : (
              <Divider />
            )
          )}
        </List>
      </Drawer>

      <Grid
        component="main"
        onClick={closeDrawer}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ mb: 1 }} data-testid="page-title">
            {title}
          </Typography>
          <Paper sx={{ p: 2, my: 3 }}>{children}</Paper>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default GenericTemplate;
