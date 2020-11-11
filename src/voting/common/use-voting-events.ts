import { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers, utils } from 'ethers';
import { abi as GOV_ABI } from '@artur-mamedbekov/networkds-test/networks/abi/GovernorAlpha.json';

import { useGovernorContract } from './voting.contracts';
import { FormattedEventData } from './voting.types';

const eventParser = new ethers.utils.Interface(GOV_ABI);

export const useVotingEvents = () => {
  const [formattedEvents, setFormattedEvents] = useState<FormattedEventData[]>(
    []
  );
  const governorContract = useGovernorContract();

  const loadEvents = useCallback(async () => {
    const proposal = await governorContract?.methods.proposals('1').call();

    if (!proposal || proposal.id === '0') return;

    const pastEvents = await governorContract?.getPastEvents(
      'ProposalCreated',
      {
        fromBlock: parseInt(proposal.startBlock, 10) - 1,
        toBlock: 'latest'
      }
    );

    const formattedEventData = pastEvents?.map(({ raw, returnValues }) => {
      const eventParsed = eventParser.parseLog(raw).args;

      return {
        proposalId: returnValues.id,
        description: eventParsed.description,
        details: eventParsed.targets?.map((target: string, i: number) => {
          const signature = eventParsed.signatures[i];
          const [name, types] = signature
            .substr(0, signature.length - 1)
            .split('(');

          const calldata = eventParsed.calldatas[i];
          const decoded = utils.defaultAbiCoder.decode(
            types.split(','),
            calldata
          );

          return {
            target,
            functionSig: name,
            callData: decoded.join(', ')
          };
        })
      };
    });

    setFormattedEvents(formattedEventData ?? []);
  }, [governorContract]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return useMemo(
    () =>
      formattedEvents.reduce<Record<string, FormattedEventData>>(
        (acc, formattedEvent) => {
          acc[formattedEvent.proposalId] = formattedEvent;

          return acc;
        },
        {}
      ),
    [formattedEvents]
  );
};
