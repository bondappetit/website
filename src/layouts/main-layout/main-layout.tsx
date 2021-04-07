import { useToggle } from 'react-use';
import React from 'react';

import { ToggleThemeButton } from 'src/common';
import { WalletButton, WalletProfile } from 'src/wallets';
import { ContactsNews } from 'src/contacts/contacts-news';
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
              <WalletProfile className={classes.profile} />
              <WalletButton />
            </>
          }
          mobileButton={<ToggleThemeButton />}
        />
        <LayoutContainer>{props.children}</LayoutContainer>
        <LayoutFooter onSubscribe={toggle} />
      </LayoutWrapper>
      <ContactsNews open={open} onClose={toggle} />
    </>
  );
};
