import React from 'react';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/expand-icon.svg';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from 'src/common';
import { useStablecoinFaqStyles } from './stablecoin-faq.styles';

export type StablecoinFaqProps = {
  className?: string;
};

export const StablecoinFaq: React.FC<StablecoinFaqProps> = (props) => {
  const classes = useStablecoinFaqStyles();

  return (
    <div className={props.className}>
      <Typography variant="h2" align="center" className={classes.title}>
        FAQ
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h5">
            What is the difference between decentralized and centralized
            stablecoins?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">
            Liquidity Provision — Sufficient liquidity and the ability to
            exchange ABT for another liquid asset are vital for the correct
            operation of the protocol. Initially, the protocol will provide its
            own liquidity pool on the Uniswap exchange. The protocol has chosen
            Uniswap in order to provide an opportunity to exchange ABT for any
            other asset to all participants of the protocol (including automatic
            protocols).
          </Typography>
          <Typography variant="body1">
            As soon as the participation of the protocol’s community in
            liquidity pools will be sufficient, the protocol will reduce its
            participation in liquidity pools. In order to stimulate
            participation in liquidity pools, the protocol provides the reward
            in governance tokens — Appetit Reward Token (ART) (the list of
            liquidity pools is determined by the community of the protocol).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h5">
            What are the legal risks for owners of centralized stablecoins?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">
            Liquidity Provision — Sufficient liquidity and the ability to
            exchange ABT for another liquid asset are vital for the correct
            operation of the protocol. Initially, the protocol will provide its
            own liquidity pool on the Uniswap exchange. The protocol has chosen
            Uniswap in order to provide an opportunity to exchange ABT for any
            other asset to all participants of the protocol (including automatic
            protocols).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h5">
            What is the price stability mechanism?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">
            Liquidity Provision — Sufficient liquidity and the ability to
            exchange ABT for another liquid asset are vital for the correct
            operation of the protocol. Initially, the protocol will provide its
            own liquidity pool on the Uniswap exchange. The protocol has chosen
            Uniswap in order to provide an opportunity to exchange ABT for any
            other asset to all participants of the protocol (including automatic
            protocols).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h5">
            Who controls the issuance of USDp?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">
            Liquidity Provision — Sufficient liquidity and the ability to
            exchange ABT for another liquid asset are vital for the correct
            operation of the protocol. Initially, the protocol will provide its
            own liquidity pool on the Uniswap exchange. The protocol has chosen
            Uniswap in order to provide an opportunity to exchange ABT for any
            other asset to all participants of the protocol (including automatic
            protocols).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h5">
            Which assets are used as collateral of USDp?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">
            Liquidity Provision — Sufficient liquidity and the ability to
            exchange ABT for another liquid asset are vital for the correct
            operation of the protocol. Initially, the protocol will provide its
            own liquidity pool on the Uniswap exchange. The protocol has chosen
            Uniswap in order to provide an opportunity to exchange ABT for any
            other asset to all participants of the protocol (including automatic
            protocols).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h5">
            What is the legal classification of USDp?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Typography variant="body1">
            Liquidity Provision — Sufficient liquidity and the ability to
            exchange ABT for another liquid asset are vital for the correct
            operation of the protocol. Initially, the protocol will provide its
            own liquidity pool on the Uniswap exchange. The protocol has chosen
            Uniswap in order to provide an opportunity to exchange ABT for any
            other asset to all participants of the protocol (including automatic
            protocols).
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
