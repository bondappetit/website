import React from 'react';
import clsx from 'clsx';

import { ReactComponent as UniswapIcon } from 'src/assets/icons/uniswap.svg';
import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { Button } from '../button';
import { Modal } from '../modal';
import { SmallModal } from '../small-modal';
import { Typography } from '../typography';
import { Link } from '../link';
import { useLinkModalStyles } from './link-modal.styles';

export type LinkModalProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onBuyCollateralMarket?: () => void;
  onBuyMarket?: () => void;
  withBuyMarket?: boolean;
  withBuyCollateralMarket?: boolean;
  tokenAddress: string;
  rewardPercent?: string;
};

export const LinkModal: React.FC<LinkModalProps> = (props) => {
  const classes = useLinkModalStyles();

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
                Buy from protocol
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
                  Buy from protocol
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
            <Button
              variant="outlined"
              component={Link}
              href={`https://info.uniswap.org/token/${props.tokenAddress}`}
              target="_blank"
              className={classes.button}
            >
              <UniswapIcon />
              Uniswap
            </Button>
          </div>
        </div>
      </SmallModal>
    </Modal>
  );
};
