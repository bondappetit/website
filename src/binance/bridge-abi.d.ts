/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type CollectFee = ContractEventLog<{
  handler: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Transit = ContractEventLog<{
  from: string;
  token: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type Withdraw = ContractEventLog<{
  paybackId: string;
  to: string;
  token: string;
  amount: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;

export interface BridgeAbi extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): BridgeAbi;
  clone(): BridgeAbi;
  methods: {
    WETH(): NonPayableTransactionObject<string>;

    changeDevelopFee(
      _amount: number | string
    ): NonPayableTransactionObject<void>;

    changeDevelopWallet(
      _developWallet: string
    ): NonPayableTransactionObject<void>;

    changeSigner(_wallet: string): NonPayableTransactionObject<void>;

    collectFee(): NonPayableTransactionObject<void>;

    developFee(): NonPayableTransactionObject<string>;

    developWallet(): NonPayableTransactionObject<string>;

    executedMap(arg0: string | number[]): NonPayableTransactionObject<boolean>;

    owner(): NonPayableTransactionObject<string>;

    signWallet(): NonPayableTransactionObject<string>;

    totalFee(): NonPayableTransactionObject<string>;

    transitETHForBSC(): PayableTransactionObject<void>;

    transitForBSC(
      _token: string,
      _amount: number | string
    ): NonPayableTransactionObject<void>;

    withdrawFromBSC(
      _signature: string | number[],
      _paybackId: string | number[],
      _token: string,
      _amount: number | string
    ): PayableTransactionObject<void>;
  };
  events: {
    CollectFee(cb?: Callback<CollectFee>): EventEmitter;
    CollectFee(options?: EventOptions, cb?: Callback<CollectFee>): EventEmitter;

    Transit(cb?: Callback<Transit>): EventEmitter;
    Transit(options?: EventOptions, cb?: Callback<Transit>): EventEmitter;

    Withdraw(cb?: Callback<Withdraw>): EventEmitter;
    Withdraw(options?: EventOptions, cb?: Callback<Withdraw>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "CollectFee", cb: Callback<CollectFee>): void;
  once(
    event: "CollectFee",
    options: EventOptions,
    cb: Callback<CollectFee>
  ): void;

  once(event: "Transit", cb: Callback<Transit>): void;
  once(event: "Transit", options: EventOptions, cb: Callback<Transit>): void;

  once(event: "Withdraw", cb: Callback<Withdraw>): void;
  once(event: "Withdraw", options: EventOptions, cb: Callback<Withdraw>): void;
}