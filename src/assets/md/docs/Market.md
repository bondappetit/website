## `Market`





### Events
#### `PriceOracleChanged(address newPriceOracle)`

An event thats emitted when an price oracle contract address changed.



#### `UniswapRouterChanged(address newUniswapRouter)`

An event thats emitted when an uniswap router contract address changed.



#### `CumulativeChanged(address newToken)`

An event thats emitted when an cumulative token changed.



#### `TokenAllowed(address token, string symbol)`

An event thats emitted when an token allowed.



#### `TokenDenied(address token)`

An event thats emitted when an token denied.



#### `BondPriceChanged(uint256 newPrice)`

An event thats emitted when an bond token price changed.



#### `Buy(address customer, address product, address token, uint256 amount, uint256 buy)`

An event thats emitted when an account buyed token.



#### `Withdrawal(address recipient, address token, uint256 amount)`

An event thats emitted when an cumulative token withdrawal.




### Variables
#### `uint256 PRICE_DECIMALS`

#### `contract ERC20 cumulative`

#### `contract ABT abt`

#### `contract Bond bond`

#### `uint256 bondPrice`

#### `contract IUniswapV2Router02 uniswapRouter`

#### `contract IUniswapAnchoredView priceOracle`

#### `mapping(address => string) allowedTokens`


### Functions
#### `constructor(address _cumulative, address _abt, address _bond, address _uniswapRouter, address _priceOracle)` (public)





**Arguments:**
- *_cumulative* - Address of cumulative token.

- *_abt* - Address of ABT token.

- *_bond* - Address of Bond token.

- *_uniswapRouter* - Address of Uniswap router contract.

- *_priceOracle* - Address of Price oracle contract.

#### `changeUniswapRouter(address _uniswapRouter)` (external)

Changed uniswap router contract address.




**Arguments:**
- *_uniswapRouter* - Address new uniswap router contract.

#### `changePriceOracle(address _priceOracle)` (external)

Changed price oracle contract address.




**Arguments:**
- *_priceOracle* - Address new price oracle contract.

#### `changeCumulativeToken(address newToken, address recipient)` (external)

Changed cumulative token address.




**Arguments:**
- *newToken* - Address new cumulative token.

- *recipient* - Address of recipient for withdraw current cumulative balance.

#### `allowToken(address token, string symbol)` (external)

Add token to tokens white list.




**Arguments:**
- *token* - Allowable token.

#### `denyToken(address token)` (external)

Remove token from tokens white list.




**Arguments:**
- *token* - Denied token.

#### `isAllowedToken(address token) → bool` (public)





**Arguments:**
- *token* - Target token.


**Returns:**
- *Is* - target token allowed.

#### `changeBondPrice(uint256 newPrice)` (external)

Update Bond token price




**Arguments:**
- *newPrice* - New price of Bond token of USD (6 decimal)

#### `transferABT(address recipient, uint256 amount)` (external)

Transfer ABT token to recipient.




**Arguments:**
- *recipient* - Address of recipient.

- *amount* - Amount of transfered token.

#### `transferBond(address recipient, uint256 amount)` (external)

Transfer Bond token to recipient.




**Arguments:**
- *recipient* - Address of recipient.

- *amount* - Amount of transfered token.

#### `priceABT(address token, uint256 amount) → uint256` (external)



Get ABT token price from payment token amount.


**Arguments:**
- *token* - Payment token.

- *amount* - Payment token amount.


**Returns:**
- *Price* - of product token.

#### `priceBond(address token, uint256 amount) → uint256` (external)



Get Bond token price from payment token amount.


**Arguments:**
- *token* - Payment token.

- *amount* - Payment token amount.


**Returns:**
- *Price* - of product token.

#### `buyABT(address token, uint256 amount) → bool` (external)

Buy ABT token with ERC20 payment token amount.




**Arguments:**
- *token* - Payment token.

- *amount* - Amount of payment token.


**Returns:**
- *True* - if success.

#### `buyBond(address token, uint256 amount) → bool` (external)

Buy Bond token with ERC20 payment token amount.




**Arguments:**
- *token* - Payment token.

- *amount* - Amount of payment token.


**Returns:**
- *True* - if success.

#### `buyABTFromETH() → bool` (external)

Buy ABT token with ETH amount.




**Returns:**
- *True* - if success.

#### `buyBondFromETH() → bool` (external)

Buy Bond token with ETH amount.




**Returns:**
- *True* - if success.

#### `withdraw(address recipient)` (public)

Withdraw cumulative token to address.




**Arguments:**
- *recipient* - Recipient of token.

