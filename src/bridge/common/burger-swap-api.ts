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

export type BurgerSwapPayback = {
  id: number;
  payback_id: string;
  status: number;
  createBlock: number;
  amount: string;
  from: string;
  token: string;
  sign: string;
  withdrawBlock: number;
  version: number;
  createTime: string;
  updateTime: string;
};

const createFetch = (url: string) => (
  path: string,
  init?: (Omit<RequestInit, 'body'> & { body: unknown }) | undefined
) =>
  fetch(`${url}${path}`, {
    ...(init ?? {}),
    body: JSON.stringify(init?.body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

const fetchWrap = createFetch(BURGER_SWAP_API_URL);

export const burgerSwapApi = {
  getTransitList: (address: string) =>
    fetchWrap('/api/getTransitList', {
      method: 'POST',
      body: { address }
    }).then((res) => res.json()) as Promise<BurgerSwapTransit[]>,

  ethTransit: (tx: string) =>
    fetchWrap('/transitapi/ethTransit', {
      method: 'POST',
      body: { tx }
    }).then((res) => res.json()),

  bscWithdraw: (tx: string) =>
    fetchWrap('/transitapi/bscWithdraw', {
      method: 'POST',
      body: { tx }
    }).then((res) => res.json()),

  ethWithdraw: (tx: string) =>
    fetchWrap('/transitapi/ethWithdraw', {
      method: 'POST',
      body: { tx }
    }).then((res) => res.json()),

  getPaybackList: (address: string) =>
    fetchWrap('/api/getPaybackList', {
      method: 'POST',
      body: { address }
    }).then((res) => res.json()) as Promise<BurgerSwapPayback[]>,

  bscPayback: (tx: string) =>
    fetchWrap('/transitapi/bscPayback', {
      method: 'POST',
      body: { tx }
    }).then((res) => res.json())
};
