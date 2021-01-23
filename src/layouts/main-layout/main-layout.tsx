import React from 'react';

import { ToggleThemeButton } from 'src/common';
import { WalletButton } from 'src/wallets';
import {
  LayoutHeader,
  LayoutContainer,
  LayoutWrapper,
  LayoutFooter
} from '../common';
import { useMainLayoutStyles } from './main-layout.styles';

export type MainLayoutProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const classes = useMainLayoutStyles();

  return (
    <LayoutWrapper
      title={props.title}
      ogImage={props.ogImage}
      ogUrl={props.ogUrl}
      description={props.description}
    >
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
      <LayoutFooter />
    </LayoutWrapper>
  );
};
