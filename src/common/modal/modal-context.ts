import { createContext, useContext } from 'react';

export const ModalContext = createContext<{
  contentRef?: (instance: HTMLDivElement | null) => void;
} | null>(null);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) throw new Error('ModalContext is null');

  return modalContext;
};
