## `Bond`





### Events
#### `DelegateChanged(address delegator, address fromDelegate, address toDelegate)`

An event thats emitted when an account changes its delegate



#### `DelegateVotesChanged(address delegate, uint256 previousBalance, uint256 newBalance)`

An event thats emitted when a delegate account's vote balance changes



#### `Transfer(address from, address to, uint256 amount)`

The standard EIP-20 transfer event



#### `Approval(address owner, address spender, uint256 amount)`

The standard EIP-20 approval event




### Variables
#### `string name`

#### `string symbol`

#### `uint8 decimals`

#### `uint256 totalSupply`

#### `mapping(address => mapping(address => uint96)) allowances`

#### `mapping(address => uint96) balances`

#### `mapping(address => struct Bond.Lock) locking`

#### `struct EnumerableSet.AddressSet lockingAllowed`

#### `mapping(address => address) delegates`

#### `mapping(address => mapping(uint32 => struct Bond.Checkpoint)) checkpoints`

#### `mapping(address => uint32) numCheckpoints`

#### `bytes32 DOMAIN_TYPEHASH`

#### `bytes32 DELEGATION_TYPEHASH`

#### `mapping(address => uint256) nonces`


### Functions
#### `constructor(address account)` (public)

Construct a new Bond token




**Arguments:**
- *account* - The initial account to grant all the tokens

#### `allowance(address account, address spender) → uint256` (external)

Get the number of tokens `spender` is approved to spend on behalf of `account`




**Arguments:**
- *account* - The address of the account holding the funds

- *spender* - The address of the account spending the funds


**Returns:**
- *The* - number of tokens approved

#### `approve(address spender, uint256 rawAmount) → bool` (external)

Approve `spender` to transfer up to `amount` from `src`


This will overwrite the approval amount for `spender`
 and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)


**Arguments:**
- *spender* - The address of the account which may transfer tokens

- *rawAmount* - The number of tokens that are approved (2^256-1 means infinite)


**Returns:**
- *Whether* - or not the approval succeeded

#### `balanceOf(address account) → uint256` (external)

Get the number of tokens held by the `account`




**Arguments:**
- *account* - The address of the account to get the balance of


**Returns:**
- *The* - number of tokens held

#### `transfer(address dst, uint256 rawAmount) → bool` (external)

Transfer `amount` tokens from `msg.sender` to `dst`




**Arguments:**
- *dst* - The address of the destination account

- *rawAmount* - The number of tokens to transfer


**Returns:**
- *Whether* - or not the transfer succeeded

#### `transferFrom(address src, address dst, uint256 rawAmount) → bool` (external)

Transfer `amount` tokens from `src` to `dst`




**Arguments:**
- *src* - The address of the source account

- *dst* - The address of the destination account

- *rawAmount* - The number of tokens to transfer


**Returns:**
- *Whether* - or not the transfer succeeded

#### `allowTransferLock(address account) → bool` (external)

Add account to transfer lock method allowed list




**Arguments:**
- *account* - Allowable account

#### `denyTransferLock(address account) → bool` (external)

Remove account from transfer lock method allowed list




**Arguments:**
- *account* - Denied account

#### `transferLock(address dst, uint256 rawAmount, uint256 date) → bool` (external)





#### `mint(address account, uint256 amount)` (public)

Creates `amount` tokens and assigns them to `account`, increasing
the total supply.





**Arguments:**
- *account* - Recipient of created token.

- *amount* - Amount of token to be created.

#### `burn(address account, uint256 amount)` (public)





**Arguments:**
- *account* - Owner of removed token.

- *amount* - Amount of token to be removed.

#### `delegate(address delegatee)` (public)

Delegate votes from `msg.sender` to `delegatee`




**Arguments:**
- *delegatee* - The address to delegate votes to

#### `delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)` (public)

Delegates votes from signatory to `delegatee`




**Arguments:**
- *delegatee* - The address to delegate votes to

- *nonce* - The contract state required to match the signature

- *expiry* - The time at which to expire the signature

- *v* - The recovery byte of the signature

- *r* - Half of the ECDSA signature pair

- *s* - Half of the ECDSA signature pair

#### `getCurrentVotes(address account) → uint96` (external)

Gets the current votes balance for `account`




**Arguments:**
- *account* - The address to get votes balance


**Returns:**
- *The* - number of current votes for `account`

#### `getPriorVotes(address account, uint256 blockNumber) → uint96` (public)

Determine the prior number of votes for an account as of a block number


Block number must be a finalized block or else this function will revert to prevent misinformation.


**Arguments:**
- *account* - The address of the account to check

- *blockNumber* - The block number to get the vote balance at


**Returns:**
- *The* - number of votes the account had as of the given block

