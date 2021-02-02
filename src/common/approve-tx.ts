import BN from 'bignumber.js';
import { Ierc20 } from 'src/generate/IERC20';
import { estimateGas } from './estimate-gas';

export async function autoApprove(
  token: Ierc20,
  owner: string,
  spender: string,
  amount: string | number
) {
  const allowance = new BN(
    await token.methods.allowance(owner, spender).call()
  );
  if (allowance.isGreaterThan(0) && allowance.isLessThan(amount)) {
    const approveZero = token.methods.approve(spender, '0');

    await approveZero.send({
      from: owner,
      gas: await estimateGas(approveZero, { from: owner })
    });
  }
  if (allowance.isEqualTo(0)) {
    const approveAll = token.methods.approve(
      spender,
      new BN(2).pow(256).minus(1).toFixed(0)
    );

    await approveAll.send({
      from: owner,
      gas: await estimateGas(approveAll, { from: owner })
    });
  }
}
