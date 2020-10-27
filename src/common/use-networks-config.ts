import networks from '@artur-mamedbekov/networkds-test';
import { useMemo } from 'react';

export const useNetworksConfig = () => {
	return useMemo(() => networks.development, []);
};
