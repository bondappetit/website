import React from 'react';
import clsx from 'clsx';

import { ReactComponent as UniswapIcon } from 'src/assets/icons/uniswap.svg';
import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ReactComponent as CakeIcon } from 'src/assets/icons/bag/cake.svg';
import { ReactComponent as WavesIcon } from 'src/assets/icons/bag/waves.svg';
import { config } from 'src/config';
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
};

const INCH_URL = 'https://app.1inch.io/#/1/swap';

export const LinkModal: React.FC<LinkModalProps> = (props) => {
  const classes = useLinkModalStyles();

  const networkConfig = useNetworkConfig();

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
            <Button
              variant="outlined"
              component={Link}
              href={`${INCH_URL}/${networkConfig.assets.USDT.symbol}/${props.tokenName}`}
              target="_blank"
              className={classes.button}
            >
              <UniswapIcon />
              Uniswap
            </Button>
            {config.PANCAKESWAP_URL && (
              <Button
                variant="outlined"
                component={Link}
                href={`${config.PANCAKESWAP_URL}/${networkConfig.assets.USDT.symbol}/${props.tokenName}`}
                target="_blank"
                className={classes.button}
              >
                <CakeIcon width="40" height="40" />
                Pancakeswap
              </Button>
            )}
            {config.WAVES_URL && (
              <Button
                variant="outlined"
                component={Link}
                href={config.WAVES_URL}
                target="_blank"
                className={classes.button}
              >
                <WavesIcon width="40" height="40" />
                Waves
              </Button>
            )}
          </div>
        </div>
      </SmallModal>
    </Modal>
  );
};
