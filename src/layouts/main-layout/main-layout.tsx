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
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  leftButton?: JSX.Element;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const leftButton = props.leftButton ?? <ToggleThemeButton />;

  return (
    <LayoutWrapper
      title={props.title}
      ogImage={props.ogImage}
      ogUrl={props.ogUrl}
      description={props.description}
    >
      <LayoutHeader leftButton={leftButton} rightButton={<WalletButton />} />
      <LayoutContainer>{props.children}</LayoutContainer>
      <LayoutFooter />
    </LayoutWrapper>
  );
};
