import { useAsyncRetry } from 'react-use';
import NodeRSA from 'node-rsa';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import {
  BN,
  dateUtils,
  humanizeNumeral,
  useNetworkConfig,
  useRealAssetDepositaryBalanceView
} from 'src/common';
import { config } from 'src/config';
import { ASSETS_MAP, PROTOCOL_ASSETS, ConfigAsset } from './contstants';
import { TableCellTypes, TableData } from './collateral-table';

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

  const { library } = useWeb3React<Web3>();

  return useAsyncRetry(async () => {
    const { USDC } = networkConfig.assets;

    const result = await realAssetDepositaryBalanceViewContract.methods
      .assets()
      .call();

    const [normalizedAssets, sumTotalValue] = result.reduce<
      [Map<string, Asset>, BN]
    >(
      ([acc, totalValueAcc], [id, amount, price]) => {
        const totalValue = new BN(amount)
          .multipliedBy(price)
          .div(new BN(10).pow(USDC.decimals));

        acc.set(id, {
          id,
          amount,
          price,
          totalValue
        });

        return [acc, totalValueAcc.plus(totalValue)];
      },
      [new Map<string, Asset>(), new BN(0)]
    );

    const currentBlock = (await library?.eth.getBlockNumber()) ?? 0;

    const events = await realAssetDepositaryBalanceViewContract.getPastEvents(
      'AssetUpdated',
      {
        fromBlock: currentBlock - (!config.IS_DEV ? 5 : 4 * 60 * 24 * 3)
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
            updatedAt: dateUtils.formatUnix(updatedAt, 'DD MMM YYYY'),
            ...asset
          } as unknown) as RealAsset);
        }

        return acc;
      },
      new Map<string, RealAsset>()
    );

    const protocolAssets: TableData['body'] = [
      ...normalizedAssets.entries()
    ].map(([id]) => {
      const asset = tableDataMap.get(id);
      const hardcodeAsset = ASSETS_MAP.get(id);

      const getTableCell = (cell: ConfigAsset) => {
        return Object.values(cell).map((title) =>
          typeof title === 'object'
            ? title
            : {
                title
              }
        );
      };

      const newAsset = hardcodeAsset
        ? { ...hardcodeAsset }
        : { ...defaultAsset };

      if (asset) {
        newAsset.percent = `${asset.totalValue
          .div(sumTotalValue)
          .multipliedBy(100)
          .integerValue()
          .toString(10)}%`;

        newAsset.totalValue = `$ ${humanizeNumeral(asset.totalValue)}`;
        newAsset.updatedAt = asset.updatedAt;
        newAsset.amount = humanizeNumeral(asset.amount);
        newAsset.isValid = asset.isValid;
        newAsset.isinCode = asset.id;

        return getTableCell(newAsset);
      }

      return getTableCell(newAsset);
    });

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
