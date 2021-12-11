import { Link, Typography } from '@mui/material';
import React from 'react';

import { constants } from '../constants';

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center" data-testid="copyright">
    {'© '}
    <Link
      href={constants.app.creatorPage}
      target="_blank"
      underline="hover"
      color="inherit"
      data-testid="crator-page-url"
    >
      {constants.app.creator}
    </Link>
    {' All Rights Reserved.'}
  </Typography>
);

export default React.memo(Copyright);
