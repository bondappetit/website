import { useCallback } from 'react';
import { useToggle } from 'react-use';

export const useStablecoinModals = () => {
  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [marketModalOpen, toggleMarketModal] = useToggle(false);
  const [sellModalOpen, toggleSellModal] = useToggle(false);

  const handleBuyMarket = useCallback(() => {
    togglelinkModal(false);
    toggleMarketModal();
  }, [togglelinkModal, toggleMarketModal]);

  return {
    linkModalOpen,
    togglelinkModal,
    marketModalOpen,
    toggleMarketModal,
    sellModalOpen,
    toggleSellModal,
    handleBuyMarket
  };
};
