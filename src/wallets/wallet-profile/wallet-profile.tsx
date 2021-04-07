import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useToggle } from 'react-use';

import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ButtonBase, LinkModal, useNetworkConfig } from 'src/common';
import { VotingInvestingForm } from 'src/voting/voting-investing-form/voting-investing-form';
import { useWalletProfileStyles } from './wallet-profile.styles';
import { WalletProfileDropdown } from './wallet-profile-dropdown';

export type WalletProfileProps = {
  className?: string;
};

export const WalletProfile: React.VFC<WalletProfileProps> = (props) => {
  const classes = useWalletProfileStyles();

  const networkConfig = useNetworkConfig();

  const ref = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dropdownOpened, toggleDropdown] = useToggle(false);
  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);

  useEffect(() => {
    const onMouseOver = () => toggleDropdown(true);
    const onMouseOut = () => toggleDropdown(false);

    const { current } = ref;

    current?.addEventListener('mouseenter', onMouseOver);
    current?.addEventListener('mouseleave', onMouseOut);

    return () => {
      current?.addEventListener('mouseenter', onMouseOver);
      current?.addEventListener('mouseleave', onMouseOut);
    };
  }, [ref, toggleDropdown]);

  const handleBuyInvestment = () => {
    togglelinkModal(false);
    toggleInvestForm(true);
  };

  return (
    <div className={clsx(classes.root, props.className)} ref={ref}>
      <ButtonBase>
        <BAGicon width="32" height="32" />
      </ButtonBase>
      {dropdownOpened && (
        <div ref={dropdownRef} className={classes.dropdown}>
          <WalletProfileDropdown onBuy={togglelinkModal} />
        </div>
      )}
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
    </div>
  );
};
