import { useAsyncRetry } from 'react-use';
import NodeRSA from 'node-rsa';

import {
  BN,
  dateUtils,
  useNetworkConfig,
  useRealAssetDepositaryBalanceView
} from 'src/common';
import { ASSETS_MAP, PROTOCOL_ASSETS } from './contstants';
import { TableCellTypes, TableData } from './collateral-table';

type Asset = {
  id: string;
  amount: string;
  price: string;
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

const isValid = (data: string, signature: string) =>
  rsa.verify(data, Buffer.from(signature, 'base64'));

export const useCollateralRealAssets = () => {
  const realAssetDepositaryBalanceViewContract = useRealAssetDepositaryBalanceView();
  const networkConfig = useNetworkConfig();

  return useAsyncRetry(async () => {
    const { USDC } = networkConfig.assets;

    const result = await realAssetDepositaryBalanceViewContract.methods
      .assets()
      .call();

    const normalizedAssets = result.reduce((acc, [id, amount, price]) => {
      acc.set(id, {
        id,
        amount,
        price
      });

      return acc;
    }, new Map<string, Asset>());

    const events = await realAssetDepositaryBalanceViewContract.getPastEvents(
      'AssetUpdated',
      {
        fromBlock: 4 * 60 * 24 * 3
      }
    );

    const sortedEvents = events
      .map(({ returnValues }) => returnValues)
      .sort((a, b) => a.updatedAt - b.updatedAt);

    const tableDataMap = sortedEvents.reduce<Map<string, RealAsset>>(
      (acc, { id, proof, updatedAt }) => {
        const asset = normalizedAssets.get(id);

        if (asset) {
          const { signature, data } = proof;

          acc.set(id, ({
            isValid: isValid(data, signature),
            signature,
            data,
            updatedAt: dateUtils.formatUnix(updatedAt, 'YYYY-MM-DD hh:mm:ss'),
            ...asset
          } as unknown) as RealAsset);
        }

        return acc;
      },
      new Map<string, RealAsset>()
    );

    const protocolAssets = [...tableDataMap.values()].reduce<TableData['body']>(
      (acc, tableDataItem) => {
        const hardcodeAsset = ASSETS_MAP.get(tableDataItem.id);

        if (hardcodeAsset && tableDataItem.id !== 'USD') {
          hardcodeAsset.totalValue = new BN(tableDataItem.amount)
            .multipliedBy(new BN(10).pow(USDC.decimals))
            .toString(10);

          hardcodeAsset.updatedAt = tableDataItem.updatedAt;

          hardcodeAsset.amount = tableDataItem.amount;

          hardcodeAsset.isValid = tableDataItem.isValid;

          hardcodeAsset.isinCode = tableDataItem.id;

          acc.push(
            Object.values(hardcodeAsset).map((title) => ({
              title
            }))
          );
        }

        if (hardcodeAsset && tableDataItem.id === 'USD') {
          hardcodeAsset.isinCode = tableDataItem.id;

          acc.push(
            Object.values(hardcodeAsset).map((title) => ({
              title
            }))
          );
        }

        return acc;
      },
      []
    );

    const firstColumn: TableData['body'][number] = [
      {
        title: 'DigiRepresent Services OÜ',
        cellType: TableCellTypes.borrower,
        value: '$0',
        rowSpan: 100
      }
    ];

    return {
      assets: { ...PROTOCOL_ASSETS, body: [firstColumn, ...protocolAssets] },
      tableDataMap
    };
  }, [realAssetDepositaryBalanceViewContract.methods, networkConfig.assets]);
};
