import React, { useState } from 'react';
import clsx from 'clsx';
import { useToggle } from 'react-use';

import { ReactComponent as MenuIcon } from 'src/assets/icons/menu.svg';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close.svg';
import { ButtonBase, useBodyScrollLock } from 'src/common';
import { LayoutLogo } from '../layout-logo';
import { LayoutMenu } from '../layout-menu';
import { useLayoutHeaderStyles } from './layout-header.styles';

export type LayoutHeaderProps = {
  rightButton?: React.ReactNode;
  mobileButton?: React.ReactNode;
  profile?: React.ReactNode;
};

export const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const classes = useLayoutHeaderStyles();

  const [open, toggle] = useToggle(false);
  const [menuElement, setMenuElement] = useState<HTMLUListElement | null>(null);

  useBodyScrollLock(open, menuElement);

  const [profileOpen, toggleProfile] = useToggle(false);

  const handleClose = () => {
    toggleProfile(false);
    toggle(false);
  };

  return (
    <header className={classes.root}>
      <div className={clsx(classes.col, classes.leftButton)}>
        <LayoutLogo className={classes.logo} />
      </div>
      <div className={clsx(classes.col, classes.center)}>
        <LayoutMenu
          className={clsx(classes.menu, {
            [classes.menuOpen]: open
          })}
          profile={profileOpen ? props.profile : undefined}
          ref={setMenuElement}
          onOpenProfile={toggleProfile}
        >
          {props.mobileButton}
        </LayoutMenu>
        <ButtonBase
          className={classes.menuButton}
          onClick={!open ? toggle : handleClose}
        >
          {open && <CloseIcon />}
          {!open && <MenuIcon />}
        </ButtonBase>
      </div>
      <div className={clsx(classes.col, classes.rightButton)}>
        {props.rightButton}
      </div>
    </header>
  );
};
