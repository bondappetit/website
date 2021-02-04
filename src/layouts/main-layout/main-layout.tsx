import React from 'react';

import { ToggleThemeButton } from 'src/common';
import { WalletButton } from 'src/wallets';
import {
  LayoutHeader,
  LayoutContainer,
  LayoutWrapper,
  LayoutFooter,
  LayoutLinks
} from '../common';
import { useMainLayoutStyles } from './main-layout.styles';

export const MainLayout: React.FC = (props) => {
  const classes = useMainLayoutStyles();

  return (
    <LayoutWrapper>
      <LayoutHeader
        rightButton={
          <>
            <ToggleThemeButton className={classes.toggleTheme} />
            <WalletButton />
          </>
        }
        mobileButton={<ToggleThemeButton />}
      />
      <LayoutContainer>{props.children}</LayoutContainer>
      <LayoutLinks />
      <LayoutFooter />
    </LayoutWrapper>
  );
};
