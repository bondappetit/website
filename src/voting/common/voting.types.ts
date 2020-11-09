export type Proposal = {
  id: string;
  proposer: string;
  eta: string;
  startBlock: string;
  endBlock: string;
  forVotes: string;
  againstVotes: string;
  canceled: boolean;
  executed: boolean;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: boolean;
  8: boolean;
};

export type ProposalWithState = {
  proposal?: Proposal;
  state?: string;
};
