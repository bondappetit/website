import React from 'react';

import { Modal, ButtonBase, useModal } from 'src/common';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-24.svg';
import { useMainHowItWorksModalStyles } from './main-how-it-works-modal.styles';
import { MainHowItWorks } from '../main-how-it-works/main-how-it-works';

export type MainHowItWorksModalProps = {
  onClose?: () => void;
};

const MainHowItWorksModal: React.FC<MainHowItWorksModalProps> = (props) => {
  const classes = useMainHowItWorksModalStyles();

  return (
    <Modal open onClose={props.onClose} className={classes.modal}>
      <div className={classes.root}>
        <ButtonBase className={classes.icon} onClick={props.onClose}>
          <CloseIcon />
        </ButtonBase>
        <MainHowItWorks />
      </div>
    </Modal>
  );
};

export const useMainHowitWorksModal = () => useModal(MainHowItWorksModal);
