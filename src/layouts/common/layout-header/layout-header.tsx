import React from 'react';
import clsx from 'clsx';
import { useToggle, useLockBodyScroll } from 'react-use';

import { ReactComponent as MenuIcon } from 'src/assets/icons/menu.svg';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close.svg';
import { config } from 'src/config';
import { ButtonBase } from 'src/common';
import { LayoutLogo } from '../layout-logo';
import { LayoutMenu } from '../layout-menu';
import { useLayoutHeaderStyles } from './layout-header.styles';

export type LayoutHeaderProps = {
  rightButton?: React.ReactNode;
  mobileButton?: React.ReactNode;
};

export const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const classes = useLayoutHeaderStyles();

  const [open, toggle] = useToggle(false);

  useLockBodyScroll(open);

  return (
    <header className={classes.root}>
      <div className={clsx(classes.col, classes.leftButton)}>
        <LayoutLogo className={classes.logo} />
      </div>
      <div className={clsx(classes.col, classes.center)}>
        {!config.IS_INVEST && (
          <>
            <LayoutMenu
              className={clsx(classes.menu, {
                [classes.menuOpen]: open
              })}
            >
              {props.mobileButton}
            </LayoutMenu>
            <ButtonBase className={classes.menuButton} onClick={toggle}>
              {open && <CloseIcon />}
              {!open && <MenuIcon />}
            </ButtonBase>
          </>
        )}
      </div>
      <div
        className={clsx(classes.col, classes.rightButton, {
          [classes.isInvest]: config.IS_INVEST
        })}
      >
        {props.rightButton}
      </div>
    </header>
  );
};
