import BN from 'bignumber.js';

BN.set({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0
  }
});

function humanizeNumeral(value: string | number | undefined) {
  if (value === undefined) return 0;

  const result = BN.isBigNumber(value) ? value : new BN(value);

  if (result.lt(10)) return result.toFormat(8);

  if (result.lt(10000)) return result.toFormat(4);

  if (result.lt(100000)) return result.toFormat(3);

  if (result.lt(1000000)) return result.toFormat(2);

  if (result.isGreaterThanOrEqualTo(1000000000))
    return `${result.div(1000000000).toFormat(2)}B`;

  return `${result.div(1000000).toFormat(2)}M`;
}

export { BN, humanizeNumeral };
