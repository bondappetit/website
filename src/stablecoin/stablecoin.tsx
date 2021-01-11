import React from 'react';
import { useToggle } from 'react-use';

import { PageWrapper } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  StablecoinDecentralized,
  StablecoinEllipse,
  StablecoinFaq,
  StablecoinTable,
  StablecoinModal
} from './common';
import { useStablecoinStyles } from './stablecoin.styles';

export type StablecoinProps = unknown;

export const Stablecoin: React.FC<StablecoinProps> = () => {
  const classes = useStablecoinStyles();

  const [open, toggleOpen] = useToggle(false);

  return (
    <>
      <MainLayout>
        <PageWrapper>
          <StablecoinEllipse className={classes.section} onBuy={toggleOpen} />
          <StablecoinDecentralized className={classes.section} />
          <StablecoinTable className={classes.section} />
          <StablecoinFaq className={classes.section} />
        </PageWrapper>
      </MainLayout>
      <StablecoinModal open={open} onClose={toggleOpen} />
    </>
  );
};
