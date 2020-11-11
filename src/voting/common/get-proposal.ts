import { ethers } from 'ethers';

import { Network } from 'src/common';
import type { GovernorAlpha } from 'src/generate/GovernorAlpha';
import { FormattedEventData } from './voting.types';

export const getProposal = (proposalId: number) => (
  governorContract: GovernorAlpha | null
) => (eventData: Record<string, FormattedEventData>) => async (
  networkConfig?: Network
) => {
  const proposal = await governorContract?.methods.proposals(proposalId).call();
  const formattedEvent = eventData[proposalId];

  return {
    id: proposal?.id,
    title: formattedEvent?.description?.split(/# |\n/g)[1] || 'Untitled',
    description: formattedEvent?.description || 'No description.',
    proposer: proposal?.proposer,
    status: await governorContract?.methods.state(proposalId).call(),
    forCount: Number(
      ethers.utils.formatUnits(
        String(proposal?.forVotes),
        networkConfig?.assets.Bond.decimals
      )
    ),
    againstCount: Number(
      ethers.utils.formatUnits(
        String(proposal?.againstVotes),
        networkConfig?.assets.Bond.decimals
      )
    ),
    startBlock: parseInt(proposal?.startBlock?.toString() ?? '', 10),
    endBlock: parseInt(proposal?.endBlock?.toString() ?? '', 10),
    details: formattedEvent?.details
  };
};
