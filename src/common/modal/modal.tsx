/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import useKeyPress from 'react-use/esm/useKeyPress';
import useLockBodyScroll from 'react-use/esm/useLockBodyScroll';

import BondHatIcon from 'src/assets/images/bondappetit-hat.png';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close.svg';
import { Portal } from '../portal';
import { ToggleThemeButton } from '../theme';
import { useModalStyles } from './modal.styles';
import { ButtonBase } from '../button-base';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const classes = useModalStyles();
  const [isPressed] = useKeyPress('Escape');
  const { onClose, open } = props;

  useLockBodyScroll(open);

  useEffect(() => {
    if (isPressed && open) {
      onClose();
    }
  }, [isPressed, onClose, open]);

  if (!open) return null;

  return (
    <Portal>
      <div className={classes.overlay}>
        <div className={classes.header}>
          <div>
            <ToggleThemeButton />
          </div>
          <img src={BondHatIcon} alt="" />
          <div>
            <ButtonBase onClick={onClose}>
              <CloseIcon />
            </ButtonBase>
          </div>
        </div>
        <div className={classes.content}>
          <div>{props.children}</div>
        </div>
      </div>
    </Portal>
  );
};
