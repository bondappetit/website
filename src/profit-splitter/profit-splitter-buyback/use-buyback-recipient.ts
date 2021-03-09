import { useCallback, useEffect, useState } from 'react';

import { useBuybackContract } from 'src/common';

export const useBuybackRecipient = () => {
  const [currentRecipient, setCurrentRecipient] = useState<
    string | undefined
  >();

  const buybackContract = useBuybackContract();

  const handleGetRecipient = useCallback(async () => {
    if (!buybackContract) return;

    const recipient = await buybackContract.methods.recipient().call();

    setCurrentRecipient(recipient);
  }, [buybackContract]);

  useEffect(() => {
    handleGetRecipient();
  }, [handleGetRecipient]);

  return currentRecipient;
};
