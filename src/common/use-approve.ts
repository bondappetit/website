import { useAsyncFn } from 'react-use';

import { autoApprove } from './approve-tx';

export const useApprove = () => useAsyncFn(autoApprove, []);
