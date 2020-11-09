import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { ReactComponent as TextRound } from 'src/assets/images/text-round.svg';
import { ReactComponent as TextCurvedLine } from 'src/assets/images/text-curved-line.svg';
import { ReactComponent as TextLine } from 'src/assets/images/text-line.svg';
import { ReactComponent as TextDoubleLine } from 'src/assets/images/text-double-line.svg';
import { ReactComponent as TokenTitleLine } from 'src/assets/images/token-title-line.svg';
import { StatisticCard } from './common';
import { useStatisticStyles } from './statistic.styles';

export type StatisticProps = {
  className?: string;
  id?: string;
};

export const Statistic: React.FC<StatisticProps> = (props) => {
  const classes = useStatisticStyles();

  return (
    <div className={clsx(props.className)} id={props.id}>
      <Typography
        variant="h2"
        weight="light"
        align="center"
        className={classes.title}
      >
        Right now, BondAppétit is conducting&nbsp;the&nbsp;
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <TextRound className={classes.textRound} />
          pre-sale
        </Typography>
        &nbsp;round of
        <br />
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <TokenTitleLine className={classes.tokenTitleLine} />
          Appetit Reward Token (ART)
        </Typography>{' '}
        — the main tool for&nbsp;
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <TextCurvedLine className={classes.textUnderline} />
          decision-making
        </Typography>
        &nbsp; in <br /> BondAppétit protocol, as well as the main&nbsp;
        <Typography
          variant="inherit"
          component="span"
          className={classes.decoratedText}
        >
          <TextLine className={classes.textUnderline} />
          reward and incentive
        </Typography>
        &nbsp; tool <br /> for participants of the protocol and the community.
      </Typography>
      <div className={classes.row}>
        <StatisticCard>
          <Typography
            variant="h1"
            component="h2"
            weight="light"
            align="center"
            className={classes.count}
          >
            1,200,000
          </Typography>
          <Typography variant="h5" align="center">
            <Typography variant="inherit" weight="bold" align="center">
              Offered during the pre-sale round
            </Typography>{' '}
            12% of the overall issue (10 000 000) is offered to early
            <br /> investors, subject to a 1-year moratorium on sale
          </Typography>
        </StatisticCard>
        <StatisticCard>
          <Typography variant="h4" align="center" className={classes.rightCard}>
            <Typography
              variant="inherit"
              component="span"
              className={classes.decoratedText}
            >
              <TextDoubleLine
                className={clsx(
                  classes.textUnderline,
                  classes.textDoubleUnderline
                )}
              />
              The funds
            </Typography>
            &nbsp; will be used to make first loans to borrowers who will bring
            the first bonds in the form of collateral to the protocol, giving an
            initial kick-off to the protocol’s economics.
          </Typography>
        </StatisticCard>
      </div>
    </div>
  );
};
