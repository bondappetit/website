import clsx from 'clsx';
import React from 'react';
import { useTheme } from 'react-jss';

import { Button, COIN_ICONS, Plate, Typography, Theme } from 'src/common';
import { ReactComponent as SchemaLight } from 'src/assets/images/schema-light.svg';
import { ReactComponent as SchemaDark } from 'src/assets/images/schema-dark.svg';
import { useMainEconomyStyles } from './main-economy.styles';

export type MainEconomyProps = {
  className?: string;
  onBuyBAG: () => void;
  onBuyUSDap: () => void;
};

export const MainEconomy: React.VFC<MainEconomyProps> = (props) => {
  const classes = useMainEconomyStyles();

  const theme = useTheme<Theme>();

  const USDapIcon = COIN_ICONS.get('USDap');
  const BAGIcon = COIN_ICONS.get('BAG');

  const Schema = theme.currentTheme === 'light' ? SchemaLight : SchemaDark;

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.scheme}>
        <Schema />
      </div>
      <Plate color="grey" withoutBorder className={classes.card}>
        <Typography variant="h5" weight="bold">
          Why buy USDap
        </Typography>
        <Typography variant="h5" className={classes.cardText}>
          The growth of the USDap supply expands the portfolio of bonds and
          boosts the price of BAG.
        </Typography>
        <Button size="medium" onClick={props.onBuyUSDap}>
          Buy {USDapIcon && <USDapIcon className={classes.icon} />} USDap
        </Button>
      </Plate>
      <Plate color="grey" withoutBorder className={classes.card}>
        <Typography variant="h5" weight="bold">
          Why buy BAG
        </Typography>
        <Typography variant="h5" className={classes.cardText}>
          Receive interest income in USDC every quarter from bonds that back the
          USDap. The growing value of BAG helps grow the emission of USDap.
        </Typography>
        <Button size="medium" onClick={props.onBuyBAG}>
          Buy {BAGIcon && <BAGIcon className={classes.icon} />} BAG
        </Button>
      </Plate>
    </div>
  );
};
