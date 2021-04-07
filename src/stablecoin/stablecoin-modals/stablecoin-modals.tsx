import React from 'react';
import { useAsyncRetry } from 'react-use';

import {
  BN,
  LinkModal,
  useMarketContract,
  useNetworkConfig,
  useStableCoinContract
} from 'src/common';
import { config } from 'src/config';
import { StablecoinCollateralMarketModal } from 'src/stablecoin/stablecoin-collateral-market-modal';
import { StablecoinMarketModal } from 'src/stablecoin/stablecoin-market-modal';
import { useRewardToken } from '../common/use-reward-token';

export type StablecoinModalsProps = {
  linkModalOpen: boolean;
  togglelinkModal: () => void;
  onBuyCollateralMarket: () => void;
  onBuyMarket: () => void;
  sellModalOpen: boolean;
  toggleSellModal: () => void;
  marketModalOpen: boolean;
  toggleMarketModal: () => void;
  collateralMarketModalOpen: boolean;
  toggleCollateralMarketModal: () => void;
};

export const StablecoinModals: React.FC<StablecoinModalsProps> = (props) => {
  const networkConfig = useNetworkConfig();

  const marketContract = useMarketContract();
  const stableContract = useStableCoinContract();
  const state = useAsyncRetry(async () => {
    if (!stableContract || !marketContract) return;

    const result = await stableContract.methods
      .balanceOf(marketContract.options.address)
      .call();

    return new BN(result).isGreaterThan(0);
  }, [marketContract, stableContract]);

  const reward = useRewardToken();

  return (
    <>
      <LinkModal
        open={props.linkModalOpen}
        onClose={props.togglelinkModal}
        withBuyMarket={state.value && config.IS_COLLATERAL}
        onBuyCollateralMarket={props.onBuyCollateralMarket}
        onBuyMarket={props.onBuyMarket}
        withBuyCollateralMarket
        tokenName={networkConfig.assets.Stable.symbol}
        tokenAddress={networkConfig.assets.Stable.address}
        rewardPercent={reward.value?.rewardPercent.toFormat(1)}
      />
      <LinkModal
        open={props.sellModalOpen}
        onClose={props.toggleSellModal}
        tokenName={networkConfig.assets.Stable.symbol}
        tokenAddress={networkConfig.assets.Stable.address}
      />
      {props.marketModalOpen && (
        <StablecoinMarketModal
          open={props.marketModalOpen}
          onClose={props.toggleMarketModal}
          tokenName="USDap"
        />
      )}
      {props.collateralMarketModalOpen && (
        <StablecoinCollateralMarketModal
          open={props.collateralMarketModalOpen}
          onClose={props.toggleCollateralMarketModal}
          tokenName="USDap"
        />
      )}
    </>
  );
};
