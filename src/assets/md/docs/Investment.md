## `Investment`





### Events
#### `UniswapRouterChanged(address newUniswapRouter)`

An event thats emitted when an uniswap router contract address changed.



#### `InvestTokenAllowed(address token)`

An event thats emitted when an invest token allowed.



#### `InvestTokenDenied(address token)`

An event thats emitted when an invest token denied.



#### `BondPriceChanged(uint256 newPrice)`

An event thats emitted when an bond price changed.



#### `Invested(address investor, address token, uint256 amount, uint256 reward)`

An event thats emitted when an invested token.



#### `Withdrawal(address recipient, address token, uint256 amount)`

An event thats emitted when an withdrawal token.




### Variables
#### `contract ERC20 cumulative`

#### `contract Bond bond`

#### `uint256 bondTokenLockDate`

#### `uint8 BOND_PRICE_DECIMALS`

#### `uint256 bondPrice`

#### `contract IUniswapV2Router02 uniswapRouter`

#### `mapping(address => bool) investmentTokens`


### Functions
#### `constructor(address _cumulative, address _bond, uint256 _bondTokenLockDate, address _uniswapRouter)` (public)





**Arguments:**
- *_cumulative* - Address of cumulative token

- *_bond* - Address of Bond token

- *_uniswapRouter* - Address of UniswapV2Router

#### `changeUniswapRouter(address _uniswapRouter)` (external)

Changed uniswap router contract address.




**Arguments:**
- *_uniswapRouter* - Address new uniswap router contract.

#### `allowToken(address token)` (external)

Add token to investable tokens white list




**Arguments:**
- *token* - Allowable token

#### `denyToken(address token)` (external)

Remove token from investable tokens white list




**Arguments:**
- *token* - Denied token

#### `changeBondPrice(uint256 newPrice)` (external)

Update Bond token price




**Arguments:**
- *newPrice* - New price of Bond token of USD (6 decimal)

#### `price(address token, uint256 amount) → uint256` (external)





**Arguments:**
- *token* - Invested token

- *amount* - Invested amount


**Returns:**
- *Amount* - bond token after swap

#### `invest(address token, uint256 amount) → bool` (external)

Invest tokens to protocol




**Arguments:**
- *token* - Invested token

- *amount* - Invested amount

#### `investETH() → bool` (external)

Invest ETH to protocol



#### `withdraw(address recipient)` (external)

Withdraw invested token to address




**Arguments:**
- *recipient* - Recipient of tokens

