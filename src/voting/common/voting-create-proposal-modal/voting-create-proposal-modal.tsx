import React from 'react';

import { Button, SmallModal, Typography, Modal } from 'src/common';
import { useVotingCreateProposalModalStyles } from './voting-create-proposal-modal.styles';

export type VotingCreateProposalModalProps = {
  className?: string;
  onClose?: () => void;
};

export const VotingCreateProposalModal: React.FC<VotingCreateProposalModalProps> =
  (props) => {
    const classes = useVotingCreateProposalModalStyles();

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography
                variant="h5"
                weight="semibold"
                className={classes.attention}
              >
                1,000,000 BAG required
              </Typography>
              <Typography variant="h5">
                In order to create new proposals you need to have at least
                1,000,000 BAG on your wallet and deligate votes.
              </Typography>
            </div>
            <Button className={classes.button} onClick={props.onClose}>
              Got It
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
