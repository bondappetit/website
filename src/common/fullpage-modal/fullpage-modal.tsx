import React from 'react';

import BondHatIcon from 'src/assets/images/bondappetit-hat.png';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close.svg';
import { ToggleThemeButton } from '../theme';
import { useFullpageModalStyles } from './fullpage-modal.styles';
import { ButtonBase } from '../button-base';

export type FullpageModalProps = {
  onClose?: () => void;
};

export const FullpageModal: React.FC<FullpageModalProps> = (props) => {
  const classes = useFullpageModalStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <ToggleThemeButton />
        </div>
        <img src={BondHatIcon} alt="" />
        <div>
          <ButtonBase onClick={props.onClose}>
            <CloseIcon />
          </ButtonBase>
        </div>
      </div>
      <div className={classes.content}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
