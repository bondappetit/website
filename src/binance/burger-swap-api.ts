const BURGER_SWAP_API_URL = 'https://burgerswap.org/api';

export type BurgerSwapTransit = {
  id: number;
  transit_id: string;
  status: number;
  createBlock: number;
  amount: string;
  symbol: string;
  decimals: number;
  name: string;
  from: string;
  token: string;
  sign: string;
  withdrawBlock: number;
  version: number;
  createTime: string;
  updateTime: string;
};

export const burgerSwapApi = {
  getTransitList: (address: string) =>
    fetch(`${BURGER_SWAP_API_URL}/getTransitList`, {
      method: 'POST',
      body: JSON.stringify({ address })
    }).then((res) => res.json()) as Promise<BurgerSwapTransit[]>
};
