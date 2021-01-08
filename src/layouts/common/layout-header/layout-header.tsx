import React from 'react';
import clsx from 'clsx';

import { ReactComponent as MenuIcon } from 'src/assets/icons/menu.svg';
import { config } from 'src/config';
import { ButtonBase } from 'src/common';
import { LayoutLogo } from '../layout-logo';
import { LayoutMenu } from '../layout-menu';
import { useLayoutHeaderStyles } from './layout-header.styles';

export type LayoutHeaderProps = {
  rightButton?: React.ReactNode;
};

export const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const classes = useLayoutHeaderStyles();

  return (
    <header className={classes.root}>
      <div className={clsx(classes.col, classes.leftButton)}>
        <LayoutLogo />
      </div>
      <div className={clsx(classes.col, classes.center)}>
        {!config.IS_INVEST && (
          <>
            <LayoutMenu className={classes.menu} />
            <ButtonBase className={classes.menuButton}>
              <MenuIcon />
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
