import BN from 'bignumber.js';
import { Ierc20 } from 'src/generate/IERC20';
import { estimateGas } from './estimate-gas';

type Options = {
  token: Ierc20;
  owner: string;
  spender: string;
  amount: string | number;
  withoutApprove?: boolean;
};

export async function autoApprove(options: Options) {
  const { token, owner, spender, amount, withoutApprove } = options;

  const allowance = new BN(
    await token.methods.allowance(owner, spender).call()
  );
  const isGreaterThanZero = allowance.isGreaterThan(0);

  if (isGreaterThanZero && allowance.isLessThan(amount)) {
    const approveZero = token.methods.approve(spender, '0');

    await approveZero.send({
      from: owner,
      gas: await estimateGas(approveZero, { from: owner })
    });
  }
  if (allowance.isEqualTo(0) && !withoutApprove) {
    const approveAll = token.methods.approve(
      spender,
      new BN(2).pow(256).minus(1).toFixed(0)
    );

    await approveAll.send({
      from: owner,
      gas: await estimateGas(approveAll, { from: owner })
    });
  }

  return isGreaterThanZero;
}
