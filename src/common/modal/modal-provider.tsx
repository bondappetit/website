import React, { useCallback, useRef, useState } from 'react';
import { useUpdateEffect, useKeyPress } from 'react-use';

import { ModalContext, Node } from './modal-context';

type Fn = (value: unknown) => void;

export const ModalProvider: React.FC = React.memo((props) => {
  const [modalNode, setModalNode] = useState<Node | null>(null);
  const [isPressed] = useKeyPress('Escape');

  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);

  const resolveRef = useRef<Fn | null>(null);
  const rejectRef = useRef<Fn | null>(null);

  const handleClose = useCallback(() => {
    if (!closeOnOverlayClick || !rejectRef.current) return;

    setModalNode(null);
    rejectRef.current('User rejection!');
  }, [closeOnOverlayClick]);
  const handleOpen = useCallback((node: Node, resolve, reject) => {
    setModalNode(node);

    resolveRef.current = resolve;
    rejectRef.current = reject;
  }, []);

  const handleOnConfirm = useCallback(
    (value?: unknown) => {
      if (!closeOnOverlayClick || !resolveRef.current) return;

      setModalNode(null);
      resolveRef.current(value);
    },
    [closeOnOverlayClick]
  );

  useUpdateEffect(() => {
    if (isPressed && modalNode) {
      setModalNode(null);

      rejectRef.current?.('User rejection!');
    }
  }, [isPressed, modalNode]);

  return (
    <ModalContext.Provider
      value={{
        onClose: handleClose,
        onOpen: handleOpen,
        closeOnOverlay: setCloseOnOverlayClick
      }}
    >
      {modalNode && (
        <modalNode.Modal
          {...modalNode.props}
          onClose={handleClose}
          onConfirm={handleOnConfirm}
        />
      )}
      {props.children}
    </ModalContext.Provider>
  );
});
