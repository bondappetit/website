## `ProfitSplitter`





### Events
#### `Transfer(address recipient, uint256 amount)`

An event thats emitted when an incoming token transferred to recipient.



#### `BudgetChanged(address newBudget, uint256 newBalance)`

An event thats emitted when an budget contract address and target balance changed.



#### `IncomingChanged(address newIncoming)`

An event thats emitted when an incoming token changed.



#### `UniswapRouterChanged(address newUniswapRouter)`

An event thats emitted when an uniswap router contract address changed.



#### `RecipientAdded(address recipient, uint256 share)`

An event thats emitted when an recipient added.



#### `RecipientRemoved(address recipient)`

An event thats emitted when an recipient removed.



#### `PayToBudget(address recipient, uint256 amount)`

An event thats emitted when an profit payed to budget.



#### `PayToRecipient(address recipient, uint256 amount)`

An event thats emitted when an profit payed to recipient.




### Variables
#### `uint256 SHARE_ACCURACY`

#### `uint256 SHARE_DIGITS`

#### `contract ERC20 incoming`

#### `address payable budget`

#### `uint256 budgetBalance`

#### `mapping(address => uint256) shares`

#### `contract IUniswapV2Router02 uniswapRouter`


### Functions
#### `receive()` (external)





#### `constructor(address _incoming, address _uniswapRouter)` (public)





**Arguments:**
- *_incoming* - Address of incoming token.

- *_uniswapRouter* - Address of Uniswap router contract.

#### `changeUniswapRouter(address _uniswapRouter)` (external)

Changed uniswap router contract address.




**Arguments:**
- *_uniswapRouter* - Address new uniswap router contract.

#### `changeBudget(address payable _budget, uint256 _budgetBalance)` (external)

Changed budget contract address and target balance.




**Arguments:**
- *_budget* - Address of budget contract.

- *_budgetBalance* - Target budget balance.

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

#### `addRecipient(address recipient, uint256 share)` (external)

Add recipient.




**Arguments:**
- *recipient* - Address of recipient contract.

- *share* - Target share.

#### `removeRecipient(address recipient)` (external)

Remove recipient.




**Arguments:**
- *recipient* - Address of recipient contract.

#### `getRecipients() → address[]` (public)

Get addresses of recipients.




**Returns:**
- *Current* - recipients list.

#### `split(uint256 amount)` (external)

Split all incoming token balance to recipients and budget contract.




**Arguments:**
- *amount* - Approved amount incoming token.

