import clsx from 'clsx';
import React, { useRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useClickAway, useToggle } from 'react-use';

import { Link, ButtonBase } from 'src/common';
import { useLayoutMenuStyles } from './layout-menu.styles';

export type LayoutMenuDropdownProps = {
  menuItems?: { title: string; link: string }[];
};

export const LayoutMenuDropdown: React.FC<LayoutMenuDropdownProps> = (
  props
) => {
  const classes = useLayoutMenuStyles();
  const dropdownRef = useRef(null);
  const [open, toggleOpen] = useToggle(false);

  useClickAway(dropdownRef, () => toggleOpen(false), ['mouseup']);

  return (
    <div ref={dropdownRef}>
      <ButtonBase
        className={clsx(classes.navLink, open && classes.activeNavLink)}
        onClick={toggleOpen}
      >
        {props.children} {open ? '↑' : '↓'}
      </ButtonBase>
      {open && (
        <ul className={clsx(classes.root, classes.dropdown)}>
          {props.menuItems?.map((menuItem) => {
            const external = menuItem.link.includes('http');

            return (
              <li className={classes.dropdownItem} key={menuItem.title}>
                <Link
                  href={menuItem.link}
                  to={!external ? menuItem.link : undefined}
                  target={external ? '_blank' : undefined}
                  component={!external ? ReactRouterLink : undefined}
                >
                  {menuItem.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
