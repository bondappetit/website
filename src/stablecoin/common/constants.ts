export const FAQ = [
  {
    title: 'What is the price stability mechanism?',
    body: [
      `The price of USDp equals $1 at all times, while the token is issued
      only if the protocol has sufficient collateral. Information
      regarding the collateral can be checked through blockchain at all times.`,
      `Price stability is connected to the protocol’s assets,
      the price of which should always be close to the value of the USDp in circulation.`
    ]
  },

  {
    title: 'Who controls the issuance of USDp?',
    body: [
      `USDp is issued by a smart contract without any legal entity behind it.
    Issuance of USDp is decided by the community of the protocol
    only when a sufficient amount of collateral is stored.`
    ]
  },

  {
    title: 'Which assets are used as collateral of USDp?',
    body: [
      `The main assets of the protocol are debt obligations assumed by the borrowers.`,
      `USDp is issued only when a new borrower originates a loan in the protocol.
      Currently, the protocol lends money only to intermediaries which fulfill certain conditions.`,
      `Intermediaries then lend money to the ultimate borrowers under
      classic lending agreements, which require borrowers to provide collateral.
      The collateral ensures that the borrower will pay to the intermediary,
      and intermediary will pay to the protocol.`,
      `If the borrower fails to pay, the collateral is sold by the intermediary allowing it to repay its debt to the protocol.`,
      `Fixed income securities (bonds) are accepted by the intermediaries as a collateral under their agreements with the borrowers.`
    ]
  },

  {
    title: 'What is the legal classification of USDp?',
    body: [
      `USDp represents the mean of transferring value, and it is defined as such exclusively by market participants.
    The token itself does not imply any obligations of the protocol, any of its participants or third parties.`
    ]
  }
];
