import React from 'react';
import { Link } from 'react-router-dom';

import BondHatIcon from 'src/assets/images/bondappetit-hat.png';
import { URLS } from 'src/router/urls';
import { useLayoutLogoStyles } from './layout-logo.styles';

export const LayoutLogo: React.FC = () => {
  const classes = useLayoutLogoStyles();

  return (
    <Link to={URLS.home} className={classes.logo}>
      <img src={BondHatIcon} alt="" className={classes.img} />
    </Link>
  );
};
