import { useToggle } from 'react-use';
import React from 'react';

import { LinkModal, ToggleThemeButton, useNetworkConfig } from 'src/common';
import { WalletButton, WalletModal } from 'src/wallets';
import {
  WalletProfile,
  WalletProfileDropdown
} from 'src/wallets/wallet-profile';
import { ContactsNews } from 'src/contacts/contacts-news';
import { VotingInvestingForm } from 'src/voting/voting-investing-form';
import {
  LayoutHeader,
  LayoutContainer,
  LayoutWrapper,
  LayoutFooter
} from '../common';
import { useMainLayoutStyles } from './main-layout.styles';

export const MainLayout: React.FC = (props) => {
  const classes = useMainLayoutStyles();

  const networkConfig = useNetworkConfig();

  const [open, toggle] = useToggle(false);

  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);

  const handleBuyInvestment = () => {
    togglelinkModal(false);
    toggleInvestForm(true);
  };

  const [walletModalOpen, toggleWalletModal] = useToggle(false);

  return (
    <>
      <LayoutWrapper>
        <LayoutHeader
          rightButton={
            <>
              <ToggleThemeButton className={classes.toggleTheme} />
              <WalletProfile className={classes.profileButton} />
              <WalletButton />
            </>
          }
          mobileButton={<ToggleThemeButton />}
          profile={
            <WalletProfileDropdown
              className={classes.profile}
              onBuy={togglelinkModal}
              onConnect={toggleWalletModal}
            />
          }
        />
        <LayoutContainer>{props.children}</LayoutContainer>
        <LayoutFooter onSubscribe={toggle} />
      </LayoutWrapper>
      <ContactsNews open={open} onClose={toggle} />
      <LinkModal
        open={linkModalOpen}
        onClose={togglelinkModal}
        tokenName={networkConfig.assets.Governance.symbol}
        tokenAddress={networkConfig.assets.Governance.address}
        withBuyInvestment
        onBuyInvestment={handleBuyInvestment}
      />
      {investFormIsOpen && (
        <VotingInvestingForm
          open={investFormIsOpen}
          onClose={toggleInvestForm}
        />
      )}
      <WalletModal open={walletModalOpen} onClose={toggleWalletModal} />
    </>
  );
};
