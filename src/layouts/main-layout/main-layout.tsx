import React from 'react';

import { WalletButton } from 'src/wallets';
import { ToggleThemeButton } from 'src/common';
import {
  LayoutHeader,
  LayoutContainer,
  LayoutWrapper,
  LayoutFooter
} from '../common';

export type MainLayoutProps = {
  title?: string;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <LayoutWrapper title={props.title}>
      <LayoutHeader
        leftButton={<ToggleThemeButton />}
        rightButton={<WalletButton />}
      />
      <LayoutContainer>{props.children}</LayoutContainer>
      <LayoutFooter />
    </LayoutWrapper>
  );
};
