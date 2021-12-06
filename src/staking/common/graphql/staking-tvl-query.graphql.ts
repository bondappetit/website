import { gql } from '@apollo/client';

export const STAKING_TVL_QUERY = gql`
  query TVL {
    getTVL
  }
`;
