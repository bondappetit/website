import React from 'react';

import { PageWrapper, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useVotingInfoStyles } from './voting-info.styles';

export const VotingInfo: React.FC = () => {
  const classes = useVotingInfoStyles();

  return (
    <MainLayout>
      <PageWrapper className={classes.root}>
        <Typography variant="h1" align="center">
          Influence the future of protocol using the BondAppétit Governance
        </Typography>
      </PageWrapper>
    </MainLayout>
  );
};
