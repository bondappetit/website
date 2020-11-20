import { renderHook } from '@testing-library/react-hooks';
import networks from '@bondappetit/networks';
import { Contract } from 'web3-eth-contract';

import { createUseContract } from './create-use-contract';

const contractOptions = {
  abi: networks.development.contracts.Investment.abi,
  address: networks.development.contracts.Investment.address
};

it('createUseContract should init hook', () => {
  const useContract = createUseContract(contractOptions);

  expect(useContract).toBeInstanceOf(Function);
});

describe('when using created use contract hook', () => {
  let useContract: () => Contract | null;

  beforeEach(() => {
    useContract = createUseContract(contractOptions);
  });

  it('should return contract', () => {
    const { rerender, result } = renderHook(() => useContract());

    rerender();

    expect(result.current).toMatchSnapshot();
  });
});
