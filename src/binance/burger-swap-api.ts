import { Maybe } from 'src/graphql/_generated-types';

const BURGER_SWAP_API_URL = 'https://burgerswap.org/api';

type Response = {
  id?: Maybe<number>;
  transit_id?: Maybe<string>;
  status?: Maybe<number>;
  createBlock: 12213733;
  amount?: Maybe<string>;
  symbol?: Maybe<string>;
  decimals?: Maybe<number>;
  name?: Maybe<string>;
  from?: Maybe<string>;
  token?: Maybe<string>;
  sign?: Maybe<string>;
  withdrawBlock?: Maybe<number>;
  version?: Maybe<number>;
  createTime?: Maybe<string>;
  updateTime?: Maybe<string>;
};

export const burgerSwapApi = {
  getTransitList: (address: string) =>
    fetch(`${BURGER_SWAP_API_URL}/getTransitList`, {
      method: 'POST',
      body: JSON.stringify({ address })
    }).then((res) => res.json()) as Promise<Response>
};
