import { useAsyncRetry } from 'react-use';
import NodeRSA from 'node-rsa';

import {
  BN,
  dateUtils,
  humanizeNumeral,
  useNetworkConfig,
  useRealAssetDepositaryBalanceView
} from 'src/common';
import { ASSETS_MAP, PROTOCOL_ASSETS } from './contstants';
import { ConfigAsset, TableCellTypes, TableData } from './collateral.types';

type Asset = {
  id: string;
  amount: string;
  price: string;
  totalValue: BN;
};

type Proof = {
  signature: string;
  data: string;
};

export type EventData = {
  id: string;
  proof: Proof;
  updatedAt: string;
};

export type RealAsset = {
  signature: string;
  data: string;
  updatedAt: string;
  isValid: boolean;
} & Asset;

const key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIY/1CNmMbKN7JJiorkpxz2RnX
3sClnDZ/zDFm0Zmh+0lU4xfEkjfp05sQzxrbgXztL0HzJkTB8v5HMICuv2WY4nPa
s8SgE8wCt19IAS/uiHkPVqOLdnfBN5iKMjOaS7GEkODlnd8KRvyeUQLP3t/a6aQt
DSvBPnFsJAs1dKhWwwIDAQAB
-----END PUBLIC KEY-----`;
const rsa = new NodeRSA(key, 'pkcs8-public-pem', {
  environment: 'browser',
  encryptionScheme: 'pkcs1',
  signingScheme: 'pkcs1-sha512'
});

const defaultAsset: ConfigAsset = {
  percent: '-',
  issuer: '-',
  totalValue: '-',
  amount: '-',
  coupon: '-',
  maturity: '-',
  isinCode: '-',
  isValid: false,
  updatedAt: '-'
};

const isValid = (data: string, signature: string) =>
  rsa.verify(data, Buffer.from(signature, 'base64'));

export const useCollateralRealAssets = () => {
  const realAssetDepositaryBalanceViewContract = useRealAssetDepositaryBalanceView();
  const networkConfig = useNetworkConfig();

  return useAsyncRetry(async () => {
    const { USDC } = networkConfig.assets;

    if (!realAssetDepositaryBalanceViewContract) return;

    const result = await realAssetDepositaryBalanceViewContract.methods
      .assets()
      .call();

    const [tableDataMap, sumTotalValue] = await result.reduce<
      Promise<[Map<string, RealAsset>, BN]>
    >(async (prev, [id, amount, price, updatedBlockAt]) => {
      const [acc, totalValueAcc] = await prev;
      const totalValue = new BN(amount)
        .multipliedBy(price)
        .div(new BN(10).pow(USDC.decimals));

      const [
        updateEvent
      ] = await realAssetDepositaryBalanceViewContract.getPastEvents(
        'AssetUpdated',
        {
          fromBlock: updatedBlockAt,
          toBlock: updatedBlockAt
        }
      );

      acc.set(id, {
        id,
        amount: ['USD'].includes(id) ? totalValue.toString() : amount,
        price,
        totalValue,
        ...(updateEvent
          ? {
              signature: updateEvent.returnValues.proof.signature,
              data: updateEvent.returnValues.proof.data,
              updatedAt: dateUtils.formatUnix(
                updateEvent.returnValues.updatedAt,
                'DD MMM YYYY'
              ),
              isValid: isValid(
                updateEvent.returnValues.proof.data,
                updateEvent.returnValues.proof.signature
              )
            }
          : {
              signature: '',
              data: '',
              updatedAt: '0',
              isValid: false
            })
      });

      return [acc, totalValueAcc.plus(totalValue)];
    }, Promise.resolve([new Map<string, RealAsset>(), new BN(0)]));

    const getTableCell = (cell: ConfigAsset) => {
      return Object.values(cell).map((title) =>
        typeof title === 'object'
          ? title
          : {
              title
            }
      );
    };

    const protocolAssets: TableData['body'] = [...tableDataMap.entries()]
      .map(([id, asset]) => {
        const hardcodeAsset = ASSETS_MAP.get(id);

        const newAsset = hardcodeAsset
          ? { ...hardcodeAsset }
          : { ...defaultAsset };

        if (asset) {
          newAsset.percent = asset.totalValue
            .div(sumTotalValue)
            .multipliedBy(100)
            .integerValue()
            .toString(10);

          newAsset.totalValue = `$ ${humanizeNumeral(asset.totalValue)}`;
          newAsset.updatedAt = asset.updatedAt;
          newAsset.amount = humanizeNumeral(asset.amount);
          newAsset.isValid = asset.isValid;
          newAsset.isinCode = {
            title: asset.id,
            contractAddress:
              realAssetDepositaryBalanceViewContract.options.address
          };

          return newAsset;
        }

        return newAsset;
      })
      .sort((a, b) => Number(b.percent) - Number(a.percent))
      .map((asset) => {
        const newAsset = { ...asset, percent: `${asset.percent}%` };

        return getTableCell(newAsset);
      });

    const firstColumn: TableData['body'][number] = [
      {
        title: 'DigiRepresent Services OÜ',
        cellType: TableCellTypes.borrower,
        value: `$${humanizeNumeral(sumTotalValue)}`,
        rowSpan: 100
      }
    ];

    return {
      assets: { ...PROTOCOL_ASSETS, body: [firstColumn, ...protocolAssets] },
      tableDataMap
    };
  }, [realAssetDepositaryBalanceViewContract, networkConfig.assets]);
};
