import React from 'react';

import { PageWrapper, Button, Input, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { useVestingSplitterInfo } from './common/use-vesting-splitter-info';

type VestingBlockProps = {
  amount: string;
  date: string;
  description: string;
  withDrawal?: boolean;
  onWithDrawal?: () => void;
};

const VestingBlock: React.VFC<VestingBlockProps> = (props) => {
  return (
    <>
      <Typography variant="h4">Amount: {props.amount} BAG</Typography>
      <Typography variant="h4">Date: {props.date}</Typography>
      <Typography variant="h4">Description: {props.description}</Typography>
      <Typography variant="h4">
        Withdrawal: {props.withDrawal ? 'yes' : 'no'}
      </Typography>
      {!props.withDrawal && (
        <Button onClick={props.onWithDrawal}>Withdraw</Button>
      )}
    </>
  );
};

type SharesBlockProps = {
  share: string;
  balance: string;
  address: string;
};

const SharesBlock: React.VFC<SharesBlockProps> = (props) => {
  return (
    <div>
      <Typography variant="h3">{props.address}</Typography>
      <Typography variant="h4">Share: {props.share}</Typography>
      <Typography variant="h4">Balance: {props.balance} BAG</Typography>
    </div>
  );
};

const RecipientForm: React.VFC = () => {
  return (
    <form>
      <Input placeholder="address" />
      <Input placeholder="share" />
      <Button type="submit">Add recipient</Button>
    </form>
  );
};

export const VestingSplitter: React.FC = () => {
  const [splitterInfo, handleWithDraw] = useVestingSplitterInfo();

  return (
    <MainLayout>
      <PageWrapper>
        <div>
          {splitterInfo.loading ? (
            <Typography variant="body1">loading...</Typography>
          ) : (
            splitterInfo.value?.map((splitterItem) => (
              <VestingBlock
                key={splitterItem.id}
                amount={splitterItem.amount}
                date={splitterItem.date}
                description={splitterItem.description}
                withDrawal={splitterItem.withdrawal}
                onWithDrawal={() => handleWithDraw(splitterItem.id)}
              />
            ))
          )}
          <Button>Split 500 BAG</Button>
        </div>
        <div>
          <div>
            <SharesBlock
              share="20%"
              balance="10000"
              address="0x9403932015576D13Fb26B135ed7a35d5d95C18d4"
            />
            <Button>Withdraw</Button>
          </div>
          <div>
            <SharesBlock
              share="40%"
              balance="50000"
              address="0x876A207aD9f6f0fA2C58A7902B2E7568a41c299f"
            />
            <Button>Change</Button>
            <Button>Delete</Button>
          </div>
        </div>
        <RecipientForm />
      </PageWrapper>
    </MainLayout>
  );
};
