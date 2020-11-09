import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from 'src/assets/icons/logo.svg';
import BondHatIcon from 'src/assets/images/bondappetit-hat.png';
import { URLS } from 'src/router/urls';
import { useLayoutLogoStyles } from './layout-logo.styles';

export type LayoutLogoProps = {};

export const LayoutLogo: React.FC<LayoutLogoProps> = () => {
  const classes = useLayoutLogoStyles();

  return (
    <Link to={URLS.home} className={classes.logo}>
      <img src={BondHatIcon} alt="" />
      <LogoIcon />
    </Link>
  );
};
