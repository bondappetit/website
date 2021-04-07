import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useHoverDirty } from 'react-use';

import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ButtonBase, Plate, Typography } from 'src/common';
import { WalletButtonWithFallback } from '../wallet-button-with-fallback';
import { useWalletProfileStyles } from './wallet-profile.styles';

export type WalletProfileProps = {
  className?: string;
};

export const WalletProfile: React.VFC<WalletProfileProps> = (props) => {
  const classes = useWalletProfileStyles();

  const ref = useRef(null);

  const { account } = useWeb3React();

  const isHovered = useHoverDirty(ref);

  return (
    <div className={clsx(classes.root, props.className)} ref={ref}>
      <ButtonBase>
        <BAGicon width="32" height="32" />
      </ButtonBase>
      {isHovered && (
        <div className={classes.dropdown}>
          <Plate className={clsx(classes.plate, classes.row)}>
            <div className={clsx(classes.header, classes.row)}>
              <Typography variant="body1" weight="bold">
                Portfolio
              </Typography>
              <Typography variant="body1">1 BAG = $4.8</Typography>
            </div>
            {account && (
              <>
                <div className={clsx(classes.row, classes.mb8)}>
                  <Typography variant="body1" className={classes.col35}>
                    Claimable
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col35}
                  >
                    6.72085648 BAG
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col30}
                  >
                    $2,634.2
                  </Typography>
                </div>
                <div className={clsx(classes.row, classes.mb8)}>
                  <Typography variant="body1" className={classes.col35}>
                    Unstacked
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col35}
                  >
                    0 BAG
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col30}
                  >
                    $0
                  </Typography>
                </div>
                <div className={classes.row}>
                  <Typography variant="body1" className={classes.col35}>
                    Locked till 27.04.22
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col35}
                  >
                    532.56 BAG
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col30}
                  >
                    $10,000
                  </Typography>
                </div>
                <div className={clsx(classes.row, classes.footer)}>
                  <Typography variant="body1" className={classes.col35}>
                    Total
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col35}
                  >
                    539.28085648 BAG
                  </Typography>
                  <Typography
                    variant="body1"
                    align="right"
                    className={classes.col30}
                  >
                    $12,661.2
                  </Typography>
                </div>
              </>
            )}
            {!account && (
              <>
                <Typography variant="body1">
                  Connect your wallet to see the stats
                </Typography>
                <WalletButtonWithFallback className={classes.button} />
              </>
            )}
          </Plate>
        </div>
      )}
    </div>
  );
};
