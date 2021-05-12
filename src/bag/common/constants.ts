export const GOVERNANCE = [
  {
    title: 'Protocol’s Management',
    text: [
      'Add a new asset type (collateral) to the basket;',
      'Add a new asset type to the Price Oracle;',
      'Whitelist a new Depository smart contract;',
      'Start the emergency shutdown procedure;',
      'Add new markets for the automatic exchange of BAG.'
    ]
  },
  {
    title: 'Protocol’s assets liquidity',
    text: [
      'Change in the reward rates for participation in liquidity pools;',
      'Choose the profit distribution of the protocol;',
      'Change the list of assets available in exchange for BAG.'
    ]
  },
  {
    title: 'Development of the protocol',
    text: [
      'Propose and vote on new features of the protocol;',
      'Change the rate of technical costs for the maintenance of the protocol;',
      'Initiate additional capitalization of the protocol;',
      'Apply changes to current smart contracts.'
    ]
  }
];

export const FACTOID = [
  {
    percent: '20%',
    text: `BondAppétit team & future team members, subject to 4-year vesting;`
  },
  {
    percent: '14%',
    text: `to BondAppétit founders, subject to 18 - months moratorium on sale;`
  },
  {
    percent: '1%',
    text: `to the pre-launch investor.`
  }
];

export const FAQ = [
  {
    title: 'What is BAG?',
    body:
      'BAG is the main tool for decision-making and the main incentive tool for participants of the protocol and the community. Technically, it is an ERC-20 token and is based on the [Compound Governance system](https://github.com/compound-developers/compound-governance-examples), as it allows ensuring transparent and secure management of the protocol by the community.'
  },

  {
    title: 'How can I acquire BAG?',
    body: `1.  They can be acquired on the market (Uniswap or Pancakeswap) at
      market price;
  2.  Distributed to those users who decided to lock their crypto into
      liquidity pools and provide the protocol with liquidity pool tokens;
  3.  Purchased at a special price via direct sale (see the message form
      above).`
  },

  {
    title: 'How can I profit on BAG?',
    body: `There are two ways of making profits on BAG tokens:

1.  On the growth of its market value;
2.  By means of passive income from owning BAG tokens.

The second way (which will be available starting from the [second launch phase](/whitepaper#46))
is making money on BAG is by simply buying the tokens and holding them
indefinitely on a special contract, thus receiving interest income from
the bonds used as collateral.

It is up to the protocol community to decide how to dispose of the bond
coupon. If the community decides to distribute it among the BAG holders,
then the income from coupons will be converted from fiat to stablecoins,
all transferred to a special contract. From there on, it will be
distributed to the owners of the governance tokens. When selecting the
bonds, the protocol is guided by an annual yield of 3-6% per annum. The
income from coupons is paid on a quarterly basis and the funds are
allocated for distribution to a special contract, as determined by the
community.

The rewards of BAG holders are directly related to the volume of USDap
stablecoins issued. The emission of the stablecoins will constantly
increase. By purchasing the tokens once, you will be receiving
incremental income from the entire amount of bonds in securing the
protocol.

The generation of stable passive income from real-world sources is one
of the key features of BondAppétit.
    `
  },

  {
    title:
      'What is the volume of the token sale, and how many tokens will be distributed to the community?',
    body: `The volume of the initial offering of BAGs will be 100m. It will be
distributed in the following shares:

-   20% to BondAppétit team and future team members, subject to 4-year
    vesting;
-   14% to BondAppétit founders, subject to 18-month moratorium on sale;
-   1% to the pre-launch investor;
-   65% reserved for protocol usage and future governance participation
    incentives. They will be distributed in two years.

After issuance, the tokens are distributed to wallets or smart
contracts. To ensure the moratorium on sale, the following restrictions
will be set for the founders’ wallets strictly during the moratorium
period:

1.  The minimum balance of BAG tokens on the wallet (is equal to the
    initial investment amount);
2.  No possibility of transfer of BAG tokens from the founders’ wallets.

Such a mechanism allows founders to participate in voting, while
ensuring the fulfillment of moratorium on sale.`
  },

  {
    title: 'How does voting work exactly?',
    body: `Voting on any given proposal lasts approximately 3 days. The proposal is
accepted if at least 4% of the tokens from the total supply (4,000,000)
have voted in favor. In case of a positive decision, the proposal is
sent to Timelock and executed in 2 days. The delay is necessary so that
members of the community can react to protocol changes and prevent
various forms of speculation.

You can find more details about voting in [this article](https://medium.com/bondappetit/bondappetit-governance-token-explained-87eeacead488).`
  },

  {
    title: 'Who can initiate governance proposals?',
    body: `Any member of the community with more than 1,000,000 BAG tokens can
create a proposal. This threshold is needed to combat spam and other
forms of abuse.`
  },

  {
    title: 'What is the price stability mechanism?',
    body: `The price of USDap equals $1 at all times. The token is issued only if
the protocol has sufficient collateral.

Information about the protocol’s assets is provided by regulated
intermediaries connected to custody accounts holding the collateral.
Issuance of USDap is technically impossible without sufficient
collateral, the price of which is tied to USD.`
  },

  {
    title: 'Who controls the issuance of USDap?',
    body: `USDap is issued by a smart contract without any legal entity behind it.
Issuance of USDap is initiated by the community of the protocol only if
the protocol has sufficient collateral.`
  },

  {
    title: 'What assets back the USDap?',
    body: `USDap is backed by real-world fixed-income securities (bonds) provided by borrowers as collateral.`
  },

  {
    title: 'What is the legal classification of USDap?',
    body: `The token represents the means of transferring value, and it is defined
as such exclusively by market participants. The token itself does not
imply any obligations of the protocol or any of its participants.

USDap owners do not possess any rights to assets of the protocol.
Neither they have any legal mechanisms or rights to oblige the protocol
or its participants to buy-back or redeem USDap or receive any other
payments or assets from the protocol.`
  }
];
