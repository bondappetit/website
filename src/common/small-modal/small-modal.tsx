import React from 'react';

import { ReactComponent as CloseIcon } from 'src/assets/icons/close-24.svg';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/arrow-left.svg';
import { useSmallModalStyles } from './small-modal.styles';
import { ButtonBase } from '../button-base';

export type SmallModalProps = {
  onClose?: () => void;
  onBack?: () => void;
};

export const SmallModal: React.FC<SmallModalProps> = (props) => {
  const classes = useSmallModalStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {props.onBack && (
          <ButtonBase className={classes.backButton} onClick={props.onBack}>
            <ArrowLeft />
          </ButtonBase>
        )}
        <ButtonBase className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </ButtonBase>
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
