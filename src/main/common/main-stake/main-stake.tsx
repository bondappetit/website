import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  Button,
  Typography,
  Link,
  Plate,
  Table,
  TableRow,
  TableBody,
  TableCell
} from 'src/common';
import { URLS } from 'src/router/urls';
import { MainTextCard } from '../main-text-card';
import { useMainStakeStyles } from './main-stake.styles';

export type MainStakeProps = {
  className?: string;
};

const TABLE = [
  ['Lock period', '3 months', '6 months', '12 months'],
  ['Share of profit', '25%', '30%', '45%'],
  ['APY', '3.32%', '6.64%', '14.93%']
];

export const MainStake: React.VFC<MainStakeProps> = (props) => {
  const classes = useMainStakeStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="h2" className={classes.title}>
        Earn rewards from bonds collateral and influence the future of the
        protocol with BAG token.{' '}
        <Link
          component={ReactRouterLink}
          to={URLS.bag}
          className={classes.link}
        >
          Explore BAG
        </Link>
      </Typography>
      <div className={classes.grid}>
        <Plate className={classes.card}>
          <Typography
            variant="h3"
            weight="semibold"
            align="center"
            className={classes.cardTitle}
          >
            Stake and Earn
          </Typography>
          <Typography
            variant="body1"
            className={classes.cardSubtitle}
            align="center"
          >
            Stake your BAG tokens and receive interest income in USDC every
            quarter
          </Typography>
          <Table className={classes.table}>
            <TableBody>
              {TABLE.map((row, index) => (
                <TableRow key={String(index)} className={classes.tableRow}>
                  {row.map((rowItem, i) => (
                    <TableCell key={rowItem} className={classes.tableCell}>
                      <Typography
                        variant="body1"
                        weight={i ? 'semibold' : undefined}
                      >
                        {rowItem}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            size="medium"
            component={ReactRouterLink}
            to={URLS.staking.list}
            className={classes.stake}
          >
            Stake
          </Button>
        </Plate>
        <Plate withoutBorder color="grey" className={classes.text}>
          <div className={classes.cards}>
            <MainTextCard>
              BAG holders receive coupon payments from bonds that back the USDap
              stablecoin. Interest income in USDC is distributed among token
              holders every quarter.
              <br />
              <Link
                color="blue"
                component={ReactRouterLink}
                to={URLS.staking.list}
              >
                Stake and earn
              </Link>
            </MainTextCard>
            <MainTextCard>
              BondAppet is governed by its community. All token holders can
              participate in governing the protocol. Any member of the community
              with more than 1,000,000 BAG tokens can create a proposal.{' '}
              <Link
                color="blue"
                component={ReactRouterLink}
                to={URLS.voting.info}
              >
                Vote or iniate a proposal
              </Link>
            </MainTextCard>
            <MainTextCard>
              BondAppetit provides a unique opportunity for early investors.
              Become a part of the protocol on early stage with special offer.{' '}
              <Link
                color="blue"
                component={ReactRouterLink}
                to={URLS.collateral.borrow}
              >
                Connect
              </Link>
            </MainTextCard>
          </div>
        </Plate>
      </div>
    </div>
  );
};