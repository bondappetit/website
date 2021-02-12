import { formatUnits } from 'ethers/lib.esm/utils';

import { Network } from 'src/common';
import type { GovernorAlpha } from 'src/generate/GovernorAlpha';
import { FormattedEventData } from './voting.types';

const TITLE_REGEX = /# |\n/g;

export const getProposal = (proposalId: number) => (
  governorContract: GovernorAlpha
) => (eventData: Record<string, FormattedEventData>) => async (
  networkConfig: Network
) => {
  const proposal = await governorContract.methods.proposals(proposalId).call();
  const formattedEvent = eventData[proposalId];

  const [title] = formattedEvent?.description?.split(TITLE_REGEX) ?? [];

  return {
    id: proposal?.id,
    eta: proposal?.eta,
    title: title?.replace('#', '') ?? 'Untitled',
    description:
      formattedEvent?.description?.replace(title, '') ?? 'No description.',
    proposer: proposal?.proposer,
    status: await governorContract.methods.state(proposalId).call(),
    forCount: Number(
      formatUnits(
        String(proposal?.forVotes),
        networkConfig.assets.Governance.decimals
      )
    ),
    againstCount: Number(
      formatUnits(
        String(proposal?.againstVotes),
        networkConfig.assets.Governance.decimals
      )
    ),
    startBlock: parseInt(proposal?.startBlock?.toString() ?? '', 10),
    endBlock: parseInt(proposal?.endBlock?.toString() ?? '', 10),
    details: formattedEvent?.details
  };
};
