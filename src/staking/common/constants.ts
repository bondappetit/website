import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ReactComponent as USDCicon } from 'src/assets/icons/coins/usdc.svg';
import { ReactComponent as USDPicon } from 'src/assets/icons/coins/usdp.svg';

export const ICONS: Record<string, typeof BAGicon> = {
  BAG: BAGicon,
  USDp: USDPicon,
  USDC: USDCicon
};
