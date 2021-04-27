import clsx from 'clsx';
import React, { forwardRef, useRef } from 'react';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import { useHoverDirty, useToggle } from 'react-use';

import { ButtonBase, Link, useDevMode } from 'src/common';
import { URLS } from 'src/router/urls';
import { config } from 'src/config';
import { useLayoutMenuStyles } from './layout-menu.styles';
import { LayoutMenuDropdown } from './layout-menu-dropdown';
import { LayoutMenuPhasesDropdown } from './layout-menu-phases-dropdown';
import { SOCIAL_LINKS } from '../constants';

enum Variants {
  mobile,
  devMode
}

type MenuItem = {
  title: string;
  link: string;
  variant?: Variants;
  children?: MenuItem[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Portfolio',
    link: '',
    variant: Variants.mobile
  },

  {
    title: 'USDap',
    link: URLS.stablecoin
  },

  {
    title: 'Bridge',
    link: URLS.bridge
  },

  {
    title: 'Staking',
    link: URLS.staking.list
  },

  {
    title: 'Collateral',
    link: URLS.collateral.list
  },

  {
    title: 'Governance',
    link: URLS.voting.info
  },

  {
    title: 'Whitepaper',
    link: URLS.whitepaper
  },

  {
    title: 'Resources',
    link: '',
    children: [
      {
        title: 'Docs',
        link: URLS.docs.list
      },
      {
        title: 'Contracts',
        link: URLS.contract
      },
      ...SOCIAL_LINKS
    ]
  },

  {
    title: 'Developers',
    link: '',
    variant: Variants.devMode,

    children: [
      {
        title: 'Monitor',
        link: URLS.monitor
      },

      {
        title: 'VestingSplitter',
        link: URLS.vestingSplitter
      },

      {
        title: 'Vesting',
        link: URLS.vesting
      },
      {
        title: 'Profit splitter',
        link: URLS.profitSplitter
      }
    ]
  }
];

const LinkIfExternal: React.FC<MenuItem> = (props) => {
  const classes = useLayoutMenuStyles();
  const external = props.link.includes('http');

  return !external ? (
    <ReactRouterNavLink
      className={clsx(classes.navLink)}
      activeClassName={classes.activeNavLink}
      exact={props.link === URLS.main}
      to={props.link}
    >
      {props.title}
    </ReactRouterNavLink>
  ) : (
    <Link href={props.link} className={clsx(classes.navLink)} target="_blank">
      {props.title}
    </Link>
  );
};

export type LayoutMenuProps = {
  menuItems?: MenuItem[];
  className?: string;
  profile?: React.ReactNode;
  children?: React.ReactNode;
};

export const LayoutMenu = forwardRef<HTMLUListElement, LayoutMenuProps>(
  (props, ref) => {
    const { menuItems = MENU_ITEMS, className, children, profile } = props;

    const classes = useLayoutMenuStyles();

    const [devMode] = useDevMode();

    const phasesRef = useRef<HTMLButtonElement | null>(null);

    const phasesHovered = useHoverDirty(phasesRef);

    const [open, toggle] = useToggle(false);

    return (
      <ul className={clsx(classes.root, classes.menu, className)} ref={ref}>
        <li className={clsx(classes.menuItem, classes.phase)}>
          <ButtonBase
            ref={phasesRef}
            className={clsx(classes.navLink, classes.phaseLink)}
          >
            Phase {config.IS_COLLATERAL ? '2' : '1'}
          </ButtonBase>
          {phasesHovered && <LayoutMenuPhasesDropdown />}
        </li>
        {menuItems.map((menuItem) => {
          if (menuItem.variant === Variants.devMode && !devMode) return null;

          return (
            <li className={classes.menuItem} key={menuItem.title}>
              {menuItem.variant === Variants.mobile && (
                <>
                  <ButtonBase
                    className={clsx(classes.navLink, classes.mobileNavLink)}
                    onClick={toggle}
                  >
                    {menuItem.title}
                  </ButtonBase>
                  {open && profile}
                </>
              )}
              {menuItem.variant !== Variants.mobile && (
                <>
                  {menuItem.link ? (
                    <LinkIfExternal {...menuItem} />
                  ) : (
                    <LayoutMenuDropdown menuItems={menuItem.children}>
                      {menuItem.title}
                    </LayoutMenuDropdown>
                  )}
                </>
              )}
            </li>
          );
        })}
        <li className={clsx(classes.menuItem, classes.toggleTheme)}>
          {children}
        </li>
      </ul>
    );
  }
);

LayoutMenu.displayName = 'LayoutMenu';
