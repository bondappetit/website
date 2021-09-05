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
import { StablecoinMarketModal } from 'src/stablecoin/stablecoin-market-modal';
import { useStablecoinHowItWorks } from '../common';
import { useRewardToken } from '../common/use-reward-token';
import { useStablecoinBuybackModal } from '../stablecoin-buyback-modal';

export type StablecoinModalsProps = {
  linkModalOpen: boolean;
  togglelinkModal: () => void;
  onBuyMarket: () => void;
  sellModalOpen: boolean;
  toggleSellModal: () => void;
  marketModalOpen: boolean;
  toggleMarketModal: () => void;
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

  const [openBuyback] = useStablecoinBuybackModal();
  const [openHowItWorks] = useStablecoinHowItWorks();

  useEffect(() => {
    if (!config.CHAIN_BINANCE_IDS.includes(Number(chainId))) {
      closeChangeNetwork();
    }
  }, [chainId, closeChangeNetwork]);

  const handleBuyback = async () => {
    try {
      if (config.CHAIN_BINANCE_IDS.includes(Number(chainId))) {
        await openChangeNetwork();
      } else {
        await openHowItWorks({
          onSwap: () => openBuyback().catch(console.error)
        });
      }

      props.toggleSellModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LinkModal
        open={props.linkModalOpen}
        onClose={props.togglelinkModal}
        withBuyMarket={state.value && config.IS_COLLATERAL}
        onBuyMarket={props.onBuyMarket}
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
    </>
  );
};
