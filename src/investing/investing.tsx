import React from 'react';
import { useToggle } from 'react-use';

import { MainLayout } from 'src/layouts';
import { Typography, PageWrapper, DocumentList, Head } from 'src/common';
import Litepaper from 'src/assets/pdf/bondappetit_litepaper.pdf';
import { URLS } from 'src/router/urls';
import { ContactsAnnounce } from 'src/contacts/contacts-announce';
import { useInvestingStyles } from './investing.styles';
import { InvestingAnnouncement, InvestingStatistic } from './common';

const DOCUMENTS = [
  {
    url: URLS.whitepaper,
    title: 'Whitepaper'
  },
  {
    url: Litepaper,
    title: 'Litepaper'
  }
];

export const Investing: React.FC = () => {
  const classes = useInvestingStyles();
  const [open, toggleModal] = useToggle(false);

  return (
    <>
      <Head />
      <MainLayout>
        <PageWrapper>
          <Typography
            variant="h1"
            weight="light"
            align="center"
            className={classes.title}
          >
            The first DeFi protocol that connects&nbsp;real-world debt
            instruments with the Ethereum ecosystem.
          </Typography>
          <InvestingAnnouncement
            className={classes.announcement}
            onClick={toggleModal}
          />
          <InvestingStatistic id="statistic" className={classes.statistic} />
          <DocumentList
            documents={DOCUMENTS}
            className={classes.documents}
            title={
              <>
                Find out more about BondAppétit protocol, our unique stablecoin{' '}
                backed by real-world debt instruments (USDap), and other
                components:
              </>
            }
          />
          <ContactsAnnounce onClose={toggleModal} open={open} />
        </PageWrapper>
      </MainLayout>
    </>
  );
};
