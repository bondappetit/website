import clsx from 'clsx';
import React, { Children, useEffect, useState } from 'react';
import { useLockBodyScroll, useUpdateEffect, useKeyPress } from 'react-use';

import { Portal } from '../portal';
import { useModalStyles } from './modal.styles';

export type ModalProps = {
  open: boolean;
  onBack?: () => void;
  onClose?: () => void;
  children: React.ReactElement | React.ReactElement[];
  className?: string;
};

export const Modal: React.VFC<ModalProps> = (props) => {
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

  const [overlayElement, setOverlayElement] = useState<HTMLDivElement | null>(
    null
  );
  useEffect(() => {
    const handleClose = () => onClose?.();
    overlayElement?.addEventListener('click', handleClose);

    return () => overlayElement?.removeEventListener('click', handleClose);
  }, [overlayElement, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div className={classes.root}>
        <div className={classes.overlay} ref={setOverlayElement} />
        <div className={clsx(classes.child, props.className)}>
          {React.cloneElement(child, {
            onClose,
            onBack
          })}
        </div>
      </div>
    </Portal>
  );
};
