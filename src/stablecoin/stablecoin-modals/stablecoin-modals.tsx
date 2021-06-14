import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { useAsyncRetry } from 'react-use';

import {
  BN,
  humanizeNumeral,
  LinkModal,
  useChangeNetworkModal,
  useMarketContract,
  useNetworkConfig,
  useStableCoinContract
} from 'src/common';
import { config } from 'src/config';
import { StablecoinCollateralMarketModal } from 'src/stablecoin/stablecoin-collateral-market-modal';
import { StablecoinMarketModal } from 'src/stablecoin/stablecoin-market-modal';
import { useStablecoinHowItWorks } from '../common';
import { useRewardToken } from '../common/use-reward-token';
import { useStablecoinBuybackModal } from '../stablecoin-buyback-modal';

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

  const { chainId } = useWeb3React();

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

  const [openChangeNetwork, closeChangeNetwork] = useChangeNetworkModal();

  const changeNetwork = () => {
    openChangeNetwork();
    props.togglelinkModal();
  };

  const [openBuyback] = useStablecoinBuybackModal();
  const [openHowItWorks] = useStablecoinHowItWorks(openBuyback);

  useEffect(() => {
    if (!config.CHAIN_BINANCE_IDS.includes(Number(chainId))) {
      closeChangeNetwork();
    }
  }, [chainId, closeChangeNetwork]);

  const handleBuyback = () => {
    if (config.CHAIN_BINANCE_IDS.includes(Number(chainId))) {
      openChangeNetwork();
    } else {
      openHowItWorks();
    }

    props.toggleSellModal();
  };

  return (
    <>
      <LinkModal
        open={props.linkModalOpen}
        onClose={props.togglelinkModal}
        withBuyMarket={state.value && config.IS_COLLATERAL}
        onBuyCollateralMarket={
          config.CHAIN_BINANCE_IDS.includes(Number(chainId))
            ? changeNetwork
            : props.onBuyCollateralMarket
        }
        onBuyMarket={props.onBuyMarket}
        withBuyCollateralMarket
        tokenName={networkConfig.assets.Stable.symbol}
        tokenAddress={networkConfig.assets.Stable.address}
        rewardPercent={humanizeNumeral(reward.value?.rewardPercent)}
      />
      <LinkModal
        open={props.sellModalOpen}
        onClose={props.toggleSellModal}
        withSell
        onBuyBack={handleBuyback}
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
