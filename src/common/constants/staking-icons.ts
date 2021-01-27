import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ReactComponent as USDCicon } from 'src/assets/icons/coins/usdc.svg';
import { ReactComponent as USDPicon } from 'src/assets/icons/coins/usdp.svg';
import { ReactComponent as USDNIcon } from 'src/assets/icons/coins/usdn.svg';

export const STAKING_ICONS: Record<string, typeof BAGicon> = {
  BAG: BAGicon,
  USDp: USDPicon,
  USDC: USDCicon,
  USDN: USDNIcon
};
