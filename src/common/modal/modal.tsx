import React, { Children } from 'react';
import useKeyPress from 'react-use/esm/useKeyPress';
import { useLockBodyScroll, useUpdateEffect } from 'react-use';

import { Portal } from '../portal';
import { useModalStyles } from './modal.styles';

export type ModalProps = {
  open: boolean;
  onBack?: () => void;
  onClose?: () => void;
  children: React.ReactElement;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const classes = useModalStyles();
  const [isPressed] = useKeyPress('Escape');
  const { onClose, open, children, onBack } = props;
  const child = Children.only(children);

  useLockBodyScroll(open);

  useUpdateEffect(() => {
    if (isPressed && open) {
      onClose?.();
    }
  }, [isPressed, onClose, open]);

  if (!open) return null;

  return (
    <Portal>
      <div className={classes.overlay}>
        {React.cloneElement(child, {
          onClose,
          onBack
        })}
      </div>
    </Portal>
  );
};
