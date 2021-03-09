import React from 'react';
import { useParams } from 'react-router-dom';

import { Link, PageWrapper, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useCollateralRealAssets } from '../common';
import { useCollateralCheckStyles } from './collateral-check.styles';

export const CollateralCheck: React.VFC = () => {
  const tableData = useCollateralRealAssets();
  const params = useParams<{ isinCode: string }>();

  const classes = useCollateralCheckStyles();

  return (
    <MainLayout>
      <PageWrapper>
        <Typography variant="body1" component="div">
          <Typography variant="inherit" component="div">
            public key:
          </Typography>
          <Typography variant="inherit" className={classes.publicKey}>
            {`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIY/1CNmMbKN7JJiorkpxz2RnX
3sClnDZ/zDFm0Zmh+0lU4xfEkjfp05sQzxrbgXztL0HzJkTB8v5HMICuv2WY4nPa
s8SgE8wCt19IAS/uiHkPVqOLdnfBN5iKMjOaS7GEkODlnd8KRvyeUQLP3t/a6aQt
DSvBPnFsJAs1dKhWwwIDAQAB
-----END PUBLIC KEY-----`}
          </Typography>
        </Typography>
        <Typography variant="body1">
          data:{' '}
          {tableData.loading
            ? '...'
            : tableData.value?.tableDataMap.get(params.isinCode)?.data}
        </Typography>
        <Typography variant="body1">
          signature:{' '}
          {tableData.loading
            ? '...'
            : tableData.value?.tableDataMap.get(params.isinCode)?.signature}
        </Typography>
        <Typography variant="body1">algorithm: sha512WithRSA</Typography>
        <Typography variant="body1">key size: 1024 bit</Typography>
        <Typography variant="body1">
          verification service:
          <Link
            href="https://8gwifi.org/rsasignverifyfunctions.jsp"
            target="_blank"
            color="blue"
          >
            https://8gwifi.org/rsasignverifyfunctions.jsp
          </Link>
        </Typography>
      </PageWrapper>
    </MainLayout>
  );
};
