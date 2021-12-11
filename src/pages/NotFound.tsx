import { Box, Container, CssBaseline, Link, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Copyright from '../components/Copyright';

const Footer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3, 2),
  marginTop: 'auto',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
}));

const NotFound = () => {
  const [t] = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom data-testid="message">
          {t('label.pageNotFound')}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom data-testid="toppage-link">
          <Link href="/" variant="body1">
            {t('label.goToTopPage')}
          </Link>
        </Typography>
      </Container>
      <Footer>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Footer>
    </Box>
  );
};

export default NotFound;
