import type { AbiItem } from 'web3-utils';

export type ContractMethodInput = {
  paramType: string;
  paramName: string;
};

export type ContractMethod = {
  methodName: string;
  inputs: ContractMethodInput[];
  payable: boolean;
};

export const parseContractMethods = <T extends { abi: AbiItem[] }>(
  contract?: T
) => {
  return contract?.abi.reduce<Record<string, ContractMethod>>(
    (acc, { name = '', type, stateMutability, inputs }) => {
      const isFunction = type === 'function';
      const stateNotViewAndPure =
        stateMutability !== 'view' && stateMutability !== 'pure';

      if (isFunction && stateNotViewAndPure) {
        acc[name] = {
          methodName: name,
          inputs:
            inputs?.map((input) => ({
              paramType: input.type,
              paramName: input.name
            })) ?? [],
          payable: stateMutability === 'payable'
        };
      }

      return acc;
    },
    {}
  );
};
