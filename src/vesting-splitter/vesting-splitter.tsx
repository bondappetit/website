import React from 'react';
import { useToggle } from 'react-use';

import {
  PageWrapper,
  Button,
  Typography,
  dateUtils,
  humanizeNumeral,
  BN,
  Modal,
  SmallModal
} from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  useVestingsplitterShares,
  useVestingSplitterTotalSupply,
  VestingSplitterChangeShare
} from './common';
import { useVestingSplitterInfo } from './common/use-vesting-splitter-info';
import { useVestingSplitterStyles } from './vesting-splitter.styles';

type VestingBlockProps = {
  id: string;
  amount: string;
  date: number;
  description: string;
  withdrawal?: boolean;
  onWithDrawal?: () => void;
};

const VestingBlock: React.VFC<VestingBlockProps> = (props) => {
  return (
    <div>
      <div>{props.id}</div>
      <Typography variant="h4">Amount: {props.amount} BAG</Typography>
      <Typography variant="h4">
        Date: {dateUtils.formatUnix(props.date, 'YYYY-MM-DD HH:mm')}
      </Typography>
      <Typography variant="h4">Description: {props.description}</Typography>
      <Typography variant="h4">
        Withdrawal: {props.withdrawal ? 'yes' : 'no'}
      </Typography>
      {!props.withdrawal &&
        dateUtils.after(
          new Date(dateUtils.formatUnix(props.date, 'YYYY-MM-DD HH:mm:ss')),
          new Date()
        ) && <Button onClick={props.onWithDrawal}>Withdraw</Button>}
    </div>
  );
};

type SharesBlockProps = {
  share: string;
  balance: BN;
  account: string;
};

const SharesBlock: React.VFC<SharesBlockProps> = (props) => {
  return (
    <div>
      <Typography variant="h3">{props.account}</Typography>
      <Typography variant="h4">Share: {props.share} %</Typography>
      <Typography variant="h4">
        Balance: {humanizeNumeral(props.balance)} BAG
      </Typography>
    </div>
  );
};

export const VestingSplitter: React.FC = () => {
  const [open, toggle] = useToggle(false);
  const classes = useVestingSplitterStyles();

  const [splitterInfo, handleWithDrawInfo] = useVestingSplitterInfo();
  const [totalSupply, handleSplit] = useVestingSplitterTotalSupply();
  const [
    splitterShares,
    handleWithdrawShares,
    handleChangeShares
  ] = useVestingsplitterShares();

  return (
    <MainLayout>
      <PageWrapper>
        <Typography variant="h2">Vesting</Typography>
        <div>
          {splitterInfo.loading ? (
            <Typography variant="body1">loading...</Typography>
          ) : (
            splitterInfo.value?.map((splitterItem) => (
              <VestingBlock
                key={splitterItem.id}
                {...splitterItem}
                onWithDrawal={() => handleWithDrawInfo(splitterItem.id)}
              />
            ))
          )}
          {totalSupply.loading && (
            <Typography variant="body1">loading...</Typography>
          )}
          {totalSupply.value?.isGreaterThan(0) && (
            <Button onClick={handleSplit}>
              Split {humanizeNumeral(totalSupply.value)} BAG
            </Button>
          )}
        </div>
        <Typography variant="h2">Shares</Typography>
        <div>
          {splitterShares.value?.shares.map((sharesItem) => (
            <div key={sharesItem.account}>
              <SharesBlock {...sharesItem} />
              {sharesItem.balance.isGreaterThan(0) &&
                sharesItem.canWithdraw && (
                  <Button onClick={handleWithdrawShares}>Withdraw</Button>
                )}
            </div>
          ))}
          <Button onClick={toggle}>Change</Button>
        </div>
        <Modal open={open} onClose={toggle}>
          <SmallModal className={classes.modal}>
            <VestingSplitterChangeShare
              accountsWithSharesMap={
                splitterShares.value?.accountsWithSharesMap
              }
              onClose={toggle}
              onSubmit={handleChangeShares}
            />
          </SmallModal>
        </Modal>
      </PageWrapper>
    </MainLayout>
  );
};
