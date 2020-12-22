## `UniswapMarketMaker`





### Events
#### `Transfer(address token, address recipient, uint256 amount)`

An event thats emitted when an token transferred to recipient.



#### `UniswapRouterChanged(address newUniswapRouter)`

An event thats emitted when an uniswap router contract address changed.



#### `IncomingChanged(address newIncoming)`

An event thats emitted when an incoming token changed.



#### `LiquidityAdded(uint256 incoming, uint256 support)`

An event thats emitted when an liquidity added.



#### `LiquidityRemoved(uint256 lp, uint256 incoming, uint256 support)`

An event thats emitted when an liquidity removed.




### Variables
#### `contract ERC20 incoming`

#### `contract ERC20 support`

#### `contract IUniswapV2Router02 uniswapRouter`


### Functions
#### `constructor(address _incoming, address _support, address _uniswapRouter)` (public)





**Arguments:**
- *_incoming* - Address of incoming token.

- *_support* - Address of support token.

- *_uniswapRouter* - Address of Uniswap router contract.

#### `transfer(address token, address recipient, uint256 amount)` (external)

Transfer incoming token to recipient.




**Arguments:**
- *token* - Address of transferred token.

- *recipient* - Address of recipient.

- *amount* - Amount of transferred token.

#### `changeUniswapRouter(address _uniswapRouter)` (external)

Changed uniswap router contract address.




**Arguments:**
- *_uniswapRouter* - Address new uniswap router contract.

#### `changeIncoming(address _incoming, address _recipient)` (external)

Change incoming token address.




**Arguments:**
- *_incoming* - New incoming token address.

- *_recipient* - Address of recipient.

#### `buyLiquidity(uint256 amount)` (external)

Buy support token and add liquidity.




**Arguments:**
- *amount* - Amount of incoming token.

#### `addLiquidity(uint256 incomingAmount, uint256 supportAmount)` (external)

Add liquidity.




**Arguments:**
- *incomingAmount* - Amount of incoming token.

- *supportAmount* - Amount of support token.

#### `liquidityPair() → address` (public)

Return liquidity pair address.




**Returns:**
- *Liquidity* - pair address.

#### `removeLiquidity(uint256 amount)` (external)

Remove liquidity.




**Arguments:**
- *amount* - Amount of liquidity pool token.

