## `Buyback`





### Events
#### `Transfer(address recipient, uint256 amount)`

An event thats emitted when an incoming token transferred to recipient.



#### `RecipientChanged(address newRecipient)`

An event thats emitted when an recipient address changed.



#### `IncomingChanged(address newIncoming)`

An event thats emitted when an incoming token changed.



#### `UniswapRouterChanged(address newUniswapRouter)`

An event thats emitted when an uniswap router contract address changed.



#### `BuybackSuccessed(uint256 incoming, uint256 outcoming)`

An event thats emitted when an buyback successed.




### Variables
#### `contract ERC20 incoming`

#### `contract ERC20 outcoming`

#### `address recipient`

#### `contract IUniswapV2Router02 uniswapRouter`


### Functions
#### `constructor(address _incoming, address _outcoming, address _recipient, address _uniswapRouter)` (public)





**Arguments:**
- *_incoming* - Address of incoming token.

- *_outcoming* - Address of outcoming token.

- *_recipient* - Address of recipient outcoming token.

- *_uniswapRouter* - Address of Uniswap router contract.

#### `changeRecipient(address _recipient)` (external)

Change recipient address.




**Arguments:**
- *_recipient* - New recipient address.

#### `changeUniswapRouter(address _uniswapRouter)` (external)

Changed uniswap router contract address.




**Arguments:**
- *_uniswapRouter* - Address new uniswap router contract.

#### `transfer(address _recipient, uint256 amount)` (public)

Transfer incoming token to recipient.




**Arguments:**
- *_recipient* - Address of recipient.

- *amount* - Amount of transferred token.

#### `changeIncoming(address _incoming, address _recipient)` (external)

Change incoming token address.




**Arguments:**
- *_incoming* - New incoming token address.

- *_recipient* - Address of recipient.

#### `buy(uint256 amount)` (external)

Make buyback attempt.




**Arguments:**
- *amount* - Amount of tokens to buyback.

