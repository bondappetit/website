const BURGER_SWAP_API_URL = 'https://burgerswap.org';

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

const fetchWrap = (
  url: string,
  init?: (Omit<RequestInit, 'body'> & { body: unknown }) | undefined
) =>
  fetch(url, {
    ...(init ?? {}),
    body: JSON.stringify(init?.body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const burgerSwapApi = {
  getTransitList: (address: string) =>
    fetchWrap(`${BURGER_SWAP_API_URL}/api/getTransitList`, {
      method: 'POST',
      body: { address }
    }).then((res) => res.json()) as Promise<BurgerSwapTransit[]>,
  ethTransit: (tx: string) =>
    fetchWrap(`${BURGER_SWAP_API_URL}/transitapi/ethTransit`, {
      method: 'POST',
      body: { tx }
    }).then((res) => res.json()) as Promise<BurgerSwapTransit[]>,
  bscWithdraw: (tx: string) =>
    fetchWrap(`${BURGER_SWAP_API_URL}/transitapi/bscWithdraw`, {
      method: 'POST',
      body: { tx }
    }).then((res) => res.json()) as Promise<BurgerSwapTransit[]>
};
