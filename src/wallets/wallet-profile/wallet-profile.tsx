import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useToggle } from 'react-use';

import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ButtonBase } from 'src/common';
import { useWalletProfileStyles } from './wallet-profile.styles';
import { WalletProfileDropdown } from './wallet-profile-dropdown';

export type WalletProfileProps = {
  className?: string;
};

export const WalletProfile: React.VFC<WalletProfileProps> = (props) => {
  const classes = useWalletProfileStyles();

  const ref = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dropdownOpened, toggleDropdown] = useToggle(false);

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

  return (
    <div className={clsx(classes.root, props.className)} ref={ref}>
      <ButtonBase>
        <BAGicon width="32" height="32" />
      </ButtonBase>
      {dropdownOpened && (
        <div ref={dropdownRef} className={classes.dropdown}>
          <WalletProfileDropdown />
        </div>
      )}
    </div>
  );
};
