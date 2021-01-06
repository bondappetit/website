import React from 'react';

import OpenGraph from 'src/assets/images/ba-opengraph.jpg';
import { MainLayout } from 'src/layouts';
import {
  ButtonBase,
  Typography,
  PageWrapper,
  ScrollIntoView,
  DocumentList
} from 'src/common';
import { ReactComponent as ArrowDownIcon } from 'src/assets/icons/arrow-down.svg';
import { config } from 'src/config';
import InvestmentDeckPdf from 'src/assets/pdf/investment-deck.pdf';
import WhitepaperPdf from 'src/assets/pdf/whitepaper.pdf';
import { InvestingForm } from './investing-form';
import { useInvestingStyles } from './investing.styles';
import { InvestingAnnouncement, InvestingStatistic } from './common';

const DOCUMENTS = [
  {
    url: WhitepaperPdf,
    title: 'Whitepaper'
  },
  {
    url: InvestmentDeckPdf,
    title: 'Investment Deck'
  }
];

export const Investing: React.FC = () => {
  const classes = useInvestingStyles();

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
          The first DeFi protocol that <br />
          connects&nbsp;real-world debt <br />
          instruments with the Ethereum <br />
          ecosystem.
        </Typography>
        {config.IS_DEV && <InvestingForm className={classes.investingForm} />}
        {!config.IS_DEV && (
          <InvestingAnnouncement className={classes.announcement} />
        )}
        <div className={classes.button}>
          <ScrollIntoView target="#statistic">
            <ButtonBase>
              <ArrowDownIcon />
            </ButtonBase>
          </ScrollIntoView>
        </div>
        <InvestingStatistic id="statistic" className={classes.statistic} />
        {config.IS_DEV && (
          <DocumentList
            documents={DOCUMENTS}
            className={classes.documents}
            title={
              <>
                Find out more about BondAppétit protocol, our unique stablecoin
                <br /> backed by real-world debt instruments (BAG), and other
                components
                <br />
                of BondAppétit:
              </>
            }
          />
        )}
      </PageWrapper>
    </MainLayout>
  );
};
