import React from 'react';

import { Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useNotFoundStyles } from './not-found.styles';

export const NotFound: React.FC = () => {
  const classes = useNotFoundStyles();

  return (
    <MainLayout>
      <div className={classes.root}>
        <Typography variant="h2" align="center">
          404
        </Typography>
        <Typography variant="h3" align="center">
          Not found
        </Typography>
      </div>
    </MainLayout>
  );
};
