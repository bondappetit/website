type EventEnum =
  | 'connect_wallet'
  | 'invest_click'
  | 'invest_success'
  | 'staking_click'
  | 'staking_success'
  | 'buy_usdap_click'
  | 'buy_usdap_success';

window.dataLayer = window.dataLayer ?? [];

const ymId = 75624769;

export const analytics = {
  send: (event: EventEnum) => {
    window.dataLayer?.push(event);
    window.ym?.(ymId, 'reachGoal', event);
  }
};
