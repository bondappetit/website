import React from 'react';
import { cutAccount } from '../cut-account';
import { isEthAddress } from '../is-eth-address';

import { Link } from '../link';
import { useNetworkConfig } from '../use-network-config';

export const LinkIfAccount: React.FC<{ children: string }> = (props) => {
  const networkConfig = useNetworkConfig();

  return isEthAddress(props.children) ? (
    <Link
      target="_blank"
      color="blue"
      href={`${networkConfig?.networkEtherscan}/address/${props.children}`}
    >
      {cutAccount(props.children)}
    </Link>
  ) : (
    <>{props.children}</>
  );
};
