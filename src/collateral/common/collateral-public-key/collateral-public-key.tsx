import clsx from 'clsx';
import React from 'react';
import { useCopyToClipboard, useDebounce } from 'react-use';

import { ButtonBase, Typography } from 'src/common';
import { PUBLIC_KEY } from '../contstants';
import { useCollateralPublicKeyStyles } from './collateral-public-key.styles';

export type CollateralPublicKeyProps = {
  className?: string;
};

const TIMEOUT = 8000;

export const CollateralPublicKey: React.VFC<CollateralPublicKeyProps> = (
  props
) => {
  const classes = useCollateralPublicKeyStyles();

  const [state, copyToClipboard] = useCopyToClipboard();

  useDebounce(
    () => {
      if (state.value) {
        copyToClipboard('');
      }
    },
    TIMEOUT,
    [state.value]
  );

  return (
    <div className={clsx(classes.root, props.className)}>
      <ButtonBase
        onClick={() => copyToClipboard(PUBLIC_KEY)}
        className={classes.button}
      >
        <div className={classes.header}>
          <Typography variant="body2" className={classes.title}>
            Public key:
          </Typography>
          <Typography
            variant="body2"
            className={!state.value ? classes.title : classes.green}
          >
            {state.value ? 'Copied' : 'Click to copy'}
          </Typography>
        </div>
        <Typography variant="body1" className={classes.text}>
          {PUBLIC_KEY}
        </Typography>
      </ButtonBase>
    </div>
  );
};
