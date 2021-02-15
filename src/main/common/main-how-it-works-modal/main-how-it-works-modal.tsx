import React from 'react';

import { Modal, ButtonBase } from 'src/common';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-24.svg';
import { useMainHowItWorksModalStyles } from './main-how-it-works-modal.styles';
import { MainHowItWorks } from '../main-how-it-works/main-how-it-works';

export type MainHowItWorksModalProps = {
  onClose: () => void;
  open: boolean;
};

export const MainHowItWorksModal: React.FC<MainHowItWorksModalProps> = (
  props
) => {
  const classes = useMainHowItWorksModalStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className={classes.root}>
        <ButtonBase className={classes.icon} onClick={props.onClose}>
          <CloseIcon />
        </ButtonBase>
        <MainHowItWorks />
      </div>
    </Modal>
  );
};
