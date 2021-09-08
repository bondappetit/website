import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { MainLayout } from 'src/layouts';
import {
  PageWrapper,
  Typography,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  Link,
  Head
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useCollateralBorrowStyles } from './collateral-borrow.styles';

const LISTS = [
  {
    title: 'Intermediaries',
    list: [
      {
        titles: [
          `Intermediaries assume the key role in terms of connecting protocol
        with real-world assets. The main function of the intermediary is
        to find new borrowers, who are willing to lock their debt
        securities in order to obtain liquidity from the protocol.`,
          `Intermediaries must satisfy the following basic requirements in
        order to be able to interact with the protocol:`
        ],

        list: [
          `Holding of 1% of the total amount of issued Governance tokens
          and locking this amount in protocol’s smart contract;`,
          `Approval by majority voting of Governance token holders and
          whitelisting by the protocol.`
        ]
      },
      {
        titles: [
          `In addition to the basic requirements, the community may
          establish additional requirements to be fulfilled by the intermediaries, such as:`
        ],

        list: [
          `Financial Intermediary License and supervision from regulators;`,
          `Insurance;`,
          `Internal audit;`,
          `Ability to exchange cryptocurrency to fiat and vice-versa in compliance with applicable regulations.`
        ]
      },
      {
        titles: [
          `In order to perform their functions, intermediaries must take
          into account the requirements established by the community of the protocol, such as:`
        ],

        list: [
          `The amount of funds which protocol is willing to make available to be borrowed;`,
          `Interest rate which has to be paid to the protocol;`,
          `The loan term.`
        ]
      }
    ]
  },
  {
    title: 'Borrowers',
    list: [
      {
        titles: [`A borrower needs to satisfy the following requirements:`],

        list: [
          `The borrower must own debt securities the price of which would cover the amount indicated in section 1 above;`,
          `The interest rate on debt securities shall be at least equal to the interest rate established in section 2 above;`,
          `The redemption period of debt securities must match the term of the loan indicated in section 3 above.`
        ]
      }
    ]
  }
];

export const CollateralBorrow: React.FC = () => {
  const classes = useCollateralBorrowStyles();

  return (
    <>
      <Head title="Borrow from BondAppetit" />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <Typography
            variant="body1"
            align="center"
            className={classes.backLink}
          >
            <Link
              to={URLS.collateral.list}
              color="blue"
              component={ReactRouterLink}
            >
              ← Collateral
            </Link>
          </Typography>
          <div className={classes.wrap}>
            <div className={classes.section}>
              <Typography variant="h1" align="center" className={classes.title}>
                Borrow from BondAppetit
              </Typography>
              <Typography variant="h4" align="center">
                Borrowing from the protocol currently is possible with use of
                services of an intermediary.
              </Typography>
            </div>
            <div className={classes.section}>
              <Typography
                variant="h2"
                align="center"
                className={classes.tableTitle}
              >
                The list of whitelisted intermediaries
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    {['Intermediary', 'Country'].map((cell) => (
                      <TableCell key={cell}>{cell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Link
                        color="blue"
                        component={ReactRouterLink}
                        to={URLS.collateral.detail('DigiRepresent')}
                      >
                        DigiRepresent Services OÜ
                      </Link>
                    </TableCell>
                    <TableCell>Estonia</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {LISTS.map((list) => (
              <div key={list.title} className={classes.section}>
                <Typography
                  variant="h2"
                  align="center"
                  className={classes.sectionTitle}
                >
                  {list.title}
                </Typography>
                {list.list.map((sublist, index) => {
                  const id = String(index);

                  return (
                    <div key={id}>
                      {sublist.titles.map((title) => (
                        <Typography
                          variant="h5"
                          component="p"
                          key={title}
                          className={classes.listTitle}
                        >
                          {title}
                        </Typography>
                      ))}
                      <ol className={classes.list}>
                        {sublist.list.map((title) => (
                          <li key={title} className={classes.listItem}>
                            <Typography variant="h5" component="p">
                              {title}
                            </Typography>
                          </li>
                        ))}
                      </ol>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </PageWrapper>
      </MainLayout>
    </>
  );
};
