import { useCallback, useEffect, useState } from 'react';

import { useBudgetContract } from 'src/common';

export const useRecipients = () => {
  const [currentRecipients, setRecipients] = useState<string[]>([]);

  const budgetContract = useBudgetContract();

  const handleGetRecipients = useCallback(async () => {
    if (!budgetContract) return;

    const recipients = await budgetContract.methods.getRecipients().call();

    setRecipients(recipients);
  }, [budgetContract]);

  useEffect(() => {
    handleGetRecipients();
  }, [handleGetRecipients]);

  return currentRecipients;
};
