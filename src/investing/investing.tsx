import React from 'react';
import { useToggle } from 'react-use';

import { MainLayout } from 'src/layouts';
import { Typography, PageWrapper, DocumentList, Head } from 'src/common';
import { config } from 'src/config';
import Litepaper from 'src/assets/pdf/BA-concept.pdf';
import { URLS } from 'src/router/urls';
import { SubscribeAnnounce } from 'src/subscribe/subscribe-announce';
import { InvestingForm } from './investing-form';
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
          {config.IS_DEV && <InvestingForm className={classes.investingForm} />}
          {!config.IS_DEV && (
            <InvestingAnnouncement
              className={classes.announcement}
              onClick={toggleModal}
            />
          )}
          <InvestingStatistic id="statistic" className={classes.statistic} />
          <DocumentList
            documents={DOCUMENTS}
            className={classes.documents}
            title={
              <>
                Find out more about BondAppétit protocol, our unique stablecoin{' '}
                backed by real-world debt instruments (USDP), and other
                components:
              </>
            }
          />
          <SubscribeAnnounce onClose={toggleModal} open={open} />
        </PageWrapper>
      </MainLayout>
    </>
  );
};
