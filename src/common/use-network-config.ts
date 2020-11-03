import networks from '@artur-mamedbekov/networkds-test';
import { useMemo, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useToasts } from 'react-toast-notifications';
import { useMount } from 'react-use';

import { config } from 'src/config';

export const useNetworkConfig = () => {
	const { addToast } = useToasts();
	const [networkId, setNetworkId] = useState(999);
	const { library } = useWeb3React<Web3>();

	useMount(() => {
		library?.eth.net.getId((error, id) => {
			setNetworkId(id);

			if (error)
				addToast(error.message, {
					appearance: 'error',
					autoDismiss: true
				});
		});
	});

	return useMemo(() => {
		if (config.isDev) {
			return networks.development;
		}

		return Object.values(networks).find(
			(network) => network.networkId === networkId
		);
	}, [networkId]);
};
