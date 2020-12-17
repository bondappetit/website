import React from 'react';
import { cutAccount } from '../cut-account';
import { isEthAddress } from '../is-eth-address';

import { Link } from '../link';
import { useNetworkConfig } from '../use-network-config';
import { useLinkIfAccountStyles } from './link-if-account.styles';

export const LinkIfAccount: React.FC<{ children: string }> = (props) => {
  const classes = useLinkIfAccountStyles();

  const networkConfig = useNetworkConfig();

  return isEthAddress(props.children) ? (
    <Link
      target="_blank"
      className={classes.link}
      href={`${networkConfig?.networkEtherscan}/address/${props.children}`}
    >
      {cutAccount(props.children)}
    </Link>
  ) : (
    <>{props.children}</>
  );
};
