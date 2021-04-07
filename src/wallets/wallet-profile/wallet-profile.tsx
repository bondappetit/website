import clsx from 'clsx';
import React, { useRef } from 'react';
import { useToggle, useClickAway } from 'react-use';

import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ButtonBase } from 'src/common';
import { useWalletProfileStyles } from './wallet-profile.styles';
import { WalletProfileDropdown } from './wallet-profile-dropdown';

export type WalletProfileProps = {
  className?: string;
};

export const WalletProfile: React.VFC<WalletProfileProps> = (props) => {
  const classes = useWalletProfileStyles();

  const [open, toggleOpen] = useToggle(false);

  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, toggleOpen.bind(null, false));

  return (
    <div className={clsx(classes.root, props.className)} ref={dropdownRef}>
      <ButtonBase onClick={toggleOpen}>
        <BAGicon width="32" height="32" />
      </ButtonBase>
      {open && <WalletProfileDropdown className={classes.dropdown} />}
    </div>
  );
};
