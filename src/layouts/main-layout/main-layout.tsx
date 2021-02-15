import { useToggle } from 'react-use';
import React from 'react';

import { ToggleThemeButton } from 'src/common';
import { WalletButton } from 'src/wallets';
import { SubscribeNews } from 'src/subscribe/subscribe-news';
import {
  LayoutHeader,
  LayoutContainer,
  LayoutWrapper,
  LayoutFooter
} from '../common';
import { useMainLayoutStyles } from './main-layout.styles';

export const MainLayout: React.FC = (props) => {
  const classes = useMainLayoutStyles();

  const [open, toggle] = useToggle(false);

  return (
    <>
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
        <LayoutFooter onSubscribe={toggle} />
      </LayoutWrapper>
      <SubscribeNews open={open} onClose={toggle} />
    </>
  );
};
