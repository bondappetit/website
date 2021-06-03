import { useCallback } from 'react';
import { useToggle } from 'react-use';

export const useStablecoinModals = () => {
  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [collateralMarketModalOpen, toggleCollateralMarketModal] =
    useToggle(false);
  const [marketModalOpen, toggleMarketModal] = useToggle(false);
  const [sellModalOpen, toggleSellModal] = useToggle(false);

  const handleBuyCollateralMarket = useCallback(() => {
    togglelinkModal(false);
    toggleCollateralMarketModal();
  }, [togglelinkModal, toggleCollateralMarketModal]);

  const handleBuyMarket = useCallback(() => {
    togglelinkModal(false);
    toggleMarketModal();
  }, [togglelinkModal, toggleMarketModal]);

  return {
    linkModalOpen,
    togglelinkModal,
    collateralMarketModalOpen,
    toggleCollateralMarketModal,
    marketModalOpen,
    toggleMarketModal,
    sellModalOpen,
    toggleSellModal,
    handleBuyCollateralMarket,
    handleBuyMarket
  };
};
