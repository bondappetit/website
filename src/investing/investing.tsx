import React from 'react';
import { useToggle } from 'react-use';

import OpenGraph from 'src/assets/images/ba-opengraph.jpg';
import { MainLayout } from 'src/layouts';
import { Typography, PageWrapper, DocumentList } from 'src/common';
import { config } from 'src/config';
import InvestmentDeckPdf from 'src/assets/pdf/BA-concept.pdf';
import { URLS } from 'src/router/urls';
import { InvestingForm } from './investing-form';
import { useInvestingStyles } from './investing.styles';
import { InvestingAnnouncement, InvestingStatistic } from './common';
import { InvestingSubscribeForm } from './investing-subscribe-form';

const DOCUMENTS = [
  {
    url: URLS.whitepaper,
    title: 'Whitepaper'
  },
  {
    url: InvestmentDeckPdf,
    title: 'Investment Deck'
  }
];

export const Investing: React.FC = () => {
  const classes = useInvestingStyles();
  const [open, toggleModal] = useToggle(false);

  return (
    <MainLayout
      title="BondAppetit - The first DeFi protocol that connects real-world debt instruments with the Ethereum ecosystem."
      ogImage={`https://bondappetit.io${OpenGraph}`}
      ogUrl="https://bondappetit.io"
    >
      <PageWrapper>
        <Typography
          variant="h1"
          weight="light"
          align="center"
          className={classes.title}
        >
          The first DeFi protocol that connects&nbsp;real-world debt instruments
          with the Ethereum ecosystem.
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
        <InvestingSubscribeForm onClose={toggleModal} open={open} />
      </PageWrapper>
    </MainLayout>
  );
};
