import { cutAccount } from './cut-account';

const ACCOUNT = '0x87aa18a47EeE34F47187159Ba3431aF143a5ceA8';
const CUTED_ACCOUNT = '0x87aa...ceA8';

it('cutAccount should return account with dots', () => {
  const cutedAccount = cutAccount(ACCOUNT);

  expect(cutedAccount).toBe(CUTED_ACCOUNT);
});
