import { StatusProps } from 'src/common';

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}

export const ProposalStateColors: Record<string, StatusProps['color']> = {
  [ProposalState.Pending]: 'grey',
  [ProposalState.Active]: 'blue',
  [ProposalState.Defeated]: 'red',
  [ProposalState.Canceled]: 'orange',
  [ProposalState.Succeeded]: 'green',
  [ProposalState.Queued]: 'purple',
  [ProposalState.Executed]: 'green',
  [ProposalState.Expired]: 'green'
};
