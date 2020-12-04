import React from 'react';

import {
  Plate,
  Skeleton,
  Typography,
  isEthAddress,
  cutAccount,
  useNetworkConfig,
  Link
} from 'src/common';
import { EventDetail } from '../voting.types';
import { useVotingDetailsBlockStyles } from './voting-details-block.styles';

export type VotingDetailsBlockProps = {
  loading: boolean;
  details?: EventDetail[];
};

export const VotingDetailsBlock: React.FC<VotingDetailsBlockProps> = (
  props
) => {
  const classes = useVotingDetailsBlockStyles();
  const networkConfig = useNetworkConfig();

  return (
    <div className={classes.root}>
      {props.loading && <Skeleton height={192} />}
      {!props.loading && (
        <Plate className={classes.details} variant="dotted">
          <>
            {props.details?.map((detail, index) => {
              const callData = detail.callData.split(',').map((data, id) => ({
                id,
                data: isEthAddress(data.trim()) ? (
                  <Link
                    target="_blank"
                    className={classes.link}
                    href={`${
                      networkConfig?.networkEtherscan
                    }/address/${data.trim()}`}
                  >
                    {cutAccount(data.trim())}
                  </Link>
                ) : (
                  data
                )
              }));

              return (
                <Typography
                  key={detail.target}
                  variant="h5"
                  component="p"
                  className={classes.line}
                >
                  <span className={classes.lineId}>{index + 1}</span>
                  <span>
                    {isEthAddress(detail.target) ? (
                      <Link
                        target="_blank"
                        className={classes.link}
                        href={`${networkConfig?.networkEtherscan}/address/${detail.target}`}
                      >
                        {cutAccount(detail.target)}
                      </Link>
                    ) : (
                      detail.target
                    )}
                    .{detail.functionSig}(
                    {callData.map(({ data, id }, i) => (
                      <React.Fragment key={id}>
                        {data}
                        {callData.length - 1 === i ? '' : ', '}
                      </React.Fragment>
                    ))}
                    )
                  </span>
                </Typography>
              );
            })}
          </>
        </Plate>
      )}
    </div>
  );
};
