import clsx from 'clsx';
import React from 'react';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';

import { Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useLayoutMenuStyles } from './layout-menu.styles';
import { LayoutMenuDropdown } from './layout-menu-dropdown';

type MenuItem = {
  title: string;
  link: string;
  children?: MenuItem[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'USDp',
    link: URLS.home
  },

  {
    title: 'Staking',
    link: URLS.stacking.list
  },

  {
    title: 'Collateral',
    link: URLS.collateral.list
  },

  {
    title: 'Governance',
    link: URLS.voting.list
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
        title: 'Monitor',
        link: URLS.monitor
      },

      {
        title: 'Oracle',
        link: URLS.oracle
      },

      {
        title: 'Vesting',
        link: URLS.vesting
      },

      {
        title: 'Market',
        link: URLS.market
      },

      {
        title: 'Docs',
        link: URLS.docs.list
      },

      {
        title: 'Profit splitter',
        link: URLS.profitSplitter
      },

      {
        title: 'Github',
        link: 'https://github.com'
      },

      {
        title: 'Blog',
        link: 'https://medium.com'
      },

      {
        title: 'Twitter',
        link: 'https://twitter.com'
      },

      {
        title: 'Facebook',
        link: 'https://facebook.com'
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
      exact
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
};

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  menuItems = MENU_ITEMS,
  className
}) => {
  const classes = useLayoutMenuStyles();

  return (
    <ul className={clsx(classes.root, classes.menu, className)}>
      {menuItems.map((menuItem) => {
        return (
          <li className={classes.menuItem} key={menuItem.title}>
            {menuItem.link ? (
              <LinkIfExternal {...menuItem} />
            ) : (
              <LayoutMenuDropdown menuItems={menuItem.children}>
                {menuItem.title}
              </LayoutMenuDropdown>
            )}
          </li>
        );
      })}
    </ul>
  );
};
