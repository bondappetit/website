import React from 'react';

import { DocsRenderer } from 'src/docs-renderer';
import BondMd from '@bondappetit/docs/api/Bond.md';
import BondInterfaceMd from '@bondappetit/docs/api/BondInterface.md';
import ABTMd from '@bondappetit/docs/api/ABT.md';
import BudgetMd from '@bondappetit/docs/api/Budget.md';
import GovernorAlphaMd from '@bondappetit/docs/api/GovernorAlpha.md';
import InvestmentMd from '@bondappetit/docs/api/Investment.md';
import IssuerMd from '@bondappetit/docs/api/Issuer.md';
import MarketMd from '@bondappetit/docs/api/Market.md';
import MigrationsMd from '@bondappetit/docs/api/Migrations.md';
import StackingMd from '@bondappetit/docs/api/Stacking.md';
import TimelockMd from '@bondappetit/docs/api/Timelock.md';
import TimelockInterfaceMd from '@bondappetit/docs/api/TimelockInterface.md';
import TreasuryMd from '@bondappetit/docs/api/Treasury.md';
import VestingMd from '@bondappetit/docs/api/Vesting.md';
import OwnablePausableMd from '@bondappetit/docs/api/utils/OwnablePausable.md';
import AgregateDepositaryBalanceViewMd from '@bondappetit/docs/api/oracle/AgregateDepositaryBalanceView.md';
import BondDepositaryBalanceViewMd from '@bondappetit/docs/api/oracle/BondDepositaryBalanceView.md';
import DepositaryOracleMd from '@bondappetit/docs/api/oracle/DepositaryOracle.md';
import HighAlertOracleMd from '@bondappetit/docs/api/oracle/HighAlertOracle.md';
import IDepositaryBalanceViewMd from '@bondappetit/docs/api/oracle/IDepositaryBalanceView.md';
import IDepositaryOracleMd from '@bondappetit/docs/api/oracle/IDepositaryOracle.md';
import ISecurityOracleMd from '@bondappetit/docs/api/oracle/ISecurityOracle.md';
import SecurityOracleMd from '@bondappetit/docs/api/oracle/SecurityOracle.md';
import BuybackMd from '@bondappetit/docs/api/profit/Buyback.md';
import ProfitSplitterMd from '@bondappetit/docs/api/profit/ProfitSplitter.md';
import UniswapMarketMakerMd from '@bondappetit/docs/api/profit/UniswapMarketMaker.md';
import IUniswapAnchoredViewMd from '@bondappetit/docs/api/uniswap/IUniswapAnchoredView.md';
import IUniswapV2FactoryMd from '@bondappetit/docs/api/uniswap/IUniswapV2Factory.md';
import IUniswapV2Router02Md from '@bondappetit/docs/api/uniswap/IUniswapV2Router02.md';

export const Docs: React.FC = () => {
  const docs = [
    BondMd,
    BondInterfaceMd,
    ABTMd,
    BudgetMd,
    GovernorAlphaMd,
    InvestmentMd,
    IssuerMd,
    MarketMd,
    MigrationsMd,
    StackingMd,
    TimelockMd,
    TimelockInterfaceMd,
    TreasuryMd,
    VestingMd,
    OwnablePausableMd,
    AgregateDepositaryBalanceViewMd,
    BondDepositaryBalanceViewMd,
    DepositaryOracleMd,
    HighAlertOracleMd,
    IDepositaryBalanceViewMd,
    IDepositaryOracleMd,
    ISecurityOracleMd,
    SecurityOracleMd,
    BuybackMd,
    ProfitSplitterMd,
    UniswapMarketMakerMd,
    IUniswapAnchoredViewMd,
    IUniswapV2FactoryMd,
    IUniswapV2Router02Md
  ].join('');

  return (
    <div>
      <DocsRenderer>{docs}</DocsRenderer>
    </div>
  );
};
