import { Box, CssBaseline, Grid, styled, Typography } from '@mui/material';
import React from 'react';

import Copyright from '../components/Copyright';
import ImageTop from '../images/top.jpg';

const Image = styled('img')(({ theme }) => ({
  margin: theme.spacing(2),
}));

const AuthTemplate = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={8}
        sx={{
          backgroundImage: `url(${ImageTop})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        data-testid="image"
      />
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            margin: (theme) => theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            width="32"
            height="32"
            loading="lazy"
            alt="logo"
            data-testid="logo"
          />
          <Typography component="h1" variant="h5" data-testid="page-title">
            {title}
          </Typography>
          {children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthTemplate;
