import React from 'react';
import clsx from 'clsx';

import { ReactComponent as UniswapIcon } from 'src/assets/icons/bag/uniswap1.svg';
import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ReactComponent as CakeIcon } from 'src/assets/icons/bag/cake.svg';
import { ReactComponent as WavesIcon } from 'src/assets/icons/waves-exchange.svg';
import { ReactComponent as SwopFiIcon } from 'src/assets/icons/swop-fi.svg';
import { config } from 'src/config';
import network from '@bondappetit/networks';
import { Button } from '../button';
import { Modal, SmallModal } from '../modal';
import { Typography } from '../typography';
import { Link } from '../link';
import { useLinkModalStyles } from './link-modal.styles';
import { useNetworkConfig } from '../use-network-config';

export type LinkModalProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onBuyCollateralMarket?: () => void;
  onBuyMarket?: () => void;
  onBuyInvestment?: () => void;
  withBuyMarket?: boolean;
  withBuyCollateralMarket?: boolean;
  withBuyInvestment?: boolean;
  tokenAddress: string;
  rewardPercent?: string;
  tokenName: string;
  withSell?: boolean;
  onBuyBack?: () => void;
};

const INCH_URL = 'https://app.1inch.io/#/1/swap';

const SELL_UNISWAP_URL =
  'https://app.uniswap.org/#/swap?inputCurrency=0x9a1997c130f4b2997166975d9aff92797d5134c2&outputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

const BUY_UNISWAP_URL =
  'https://app.uniswap.org/#/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x9a1997c130f4b2997166975d9aff92797d5134c2';

export const LinkModal: React.FC<LinkModalProps> = (props) => {
  const classes = useLinkModalStyles();

  const networkConfig = useNetworkConfig();

  const uniswapUrl = `${INCH_URL}/${networkConfig.assets.USDC.symbol}/${props.tokenName}`;

  const uniswapUsdap = props.withSell ? SELL_UNISWAP_URL : BUY_UNISWAP_URL;

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <div className={classes.buttons}>
            {props.withBuyCollateralMarket && (
              <Button
                onClick={props.onBuyCollateralMarket}
                className={classes.button}
              >
                Buy {props.tokenName}
              </Button>
            )}
            {props.withBuyMarket && (
              <Button
                onClick={props.onBuyMarket}
                className={clsx(classes.button, classes.fromProtocol)}
              >
                <Typography
                  variant="inherit"
                  component="span"
                  className={classes.buttonTitle}
                >
                  Buy {props.tokenName}
                </Typography>
                <Typography variant="body1" component="span" align="center">
                  Get extra +{props.rewardPercent}% of your investment as
                  <br />
                  <BAGicon
                    className={classes.bagIcon}
                    height="1em"
                    width="1em"
                  />{' '}
                  BAG reward
                </Typography>
              </Button>
            )}
            {props.withBuyInvestment && (
              <Button
                onClick={props.onBuyInvestment}
                className={clsx(classes.button, classes.fromProtocol)}
              >
                <Typography
                  variant="inherit"
                  component="span"
                  className={classes.buttonTitle}
                  align="center"
                >
                  Buy with a fixed price
                </Typography>
                <Typography variant="body1" component="span" align="center">
                  Get{' '}
                  <BAGicon
                    className={classes.bagIcon}
                    height="1em"
                    width="1em"
                  />{' '}
                  BAG at a fixed price $2.5 and
                  <br />a 6-month lockup period.
                </Typography>
              </Button>
            )}
            {props.withSell && config.BUY_BACK_ENABLE && (
              <Button onClick={props.onBuyBack} className={classes.button}>
                Convert to USDC
              </Button>
            )}
            <Button
              variant="outlined"
              component={Link}
              href={
                props.tokenName === networkConfig.assets.Stable.symbol
                  ? uniswapUsdap
                  : uniswapUrl
              }
              target="_blank"
              className={classes.button}
            >
              <UniswapIcon width="40" height="40" />
              Uniswap
            </Button>
            {config.PANCAKESWAP_URL &&
              networkConfig.assets.Stable.symbol !== props.tokenName && (
                <Button
                  variant="outlined"
                  component={Link}
                  href={`${config.PANCAKESWAP_URL}/BNB/${network.mainBSC.assets.bBAG.symbol}`}
                  target="_blank"
                  className={classes.button}
                >
                  <CakeIcon width="40" height="40" />
                  PancakeSwap
                </Button>
              )}
            {config.WAVES_URL &&
              networkConfig.assets.Stable.symbol !== props.tokenName && (
                <Button
                  variant="outlined"
                  component={Link}
                  href={config.WAVES_URL}
                  target="_blank"
                  className={classes.button}
                >
                  <WavesIcon width="40" height="40" />
                  Waves.exchange
                </Button>
              )}
            {config.SWOP_URL &&
              networkConfig.assets.Stable.symbol !== props.tokenName && (
                <Button
                  variant="outlined"
                  component={Link}
                  href={config.SWOP_URL}
                  target="_blank"
                  className={classes.button}
                >
                  <SwopFiIcon width="40" height="40" />
                  Swop.fi
                </Button>
              )}
          </div>
        </div>
      </SmallModal>
    </Modal>
  );
};
