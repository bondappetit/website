import networks from '@bondappetit/networks';

import { parseContractMethods } from './parse-contract-methods';

it('parseContractMethods should return parsed methods of contract', () => {
  const [, , contract] = Object.values(networks.development.contracts);

  const parsedContractMethods = parseContractMethods(contract);

  expect(parsedContractMethods).toMatchSnapshot();
});
