import { useCallback, useEffect } from 'react';

import { useModalContext } from './modal-context';

type Arg<T> = T extends { onConfirm: (value: infer Y) => void } ? Y : never;

export const useModal = <T extends React.ElementType>(
  Modal: T,
  closable?: boolean
) => {
  const { onOpen, onClose, closeOnOverlay } = useModalContext();

  type Props = T extends React.ElementType<infer Y>
    ? Omit<Y, 'onClose' | 'onConfirm'>
    : never;

  type Result = T extends React.ElementType<infer Y> ? Arg<Y> : never;

  const handleOpen = useCallback(
    (props?: Props): Promise<Result> => {
      const promise = new Promise<Result>((resolve, reject) =>
        onOpen({ Modal, props }, resolve, reject)
      );

      return promise;
    },
    [Modal, onOpen]
  );

  useEffect(() => {
    if (closable !== undefined) {
      closeOnOverlay(closable);
    }
  }, [closable, closeOnOverlay]);

  return [handleOpen, onClose] as const;
};
