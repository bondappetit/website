## `Stacking`





### Events
#### `RewardChanged(address token, uint256 from, uint256 to)`

An event thats emitted when an token reward changed.



#### `Locked(address account, address token, uint256 amount)`

An event thats emitted when a token is locked by an account.



#### `Unlocked(address account, address token)`

An event thats emitted when a token is unlocked by an account.




### Variables
#### `contract ERC20 rewardToken`

#### `mapping(address => struct Stacking.Reward) rewards`

#### `mapping(address => mapping(address => struct Stacking.Balance)) balances`


### Functions
#### `constructor(address _rewardToken)` (public)





**Arguments:**
- *_rewardToken* - Address of reward token contract.

#### `changeReward(address token, uint256 newDelta)` (external)

Change reward token delta.




**Arguments:**
- *token* - Changed token address.

- *newDelta* - New reward delta.

#### `price(address token) → uint256` (public)

Get current price of token.




**Arguments:**
- *token* - Address of token.


**Returns:**
- *Price* - of token.

#### `reward(address token) → uint256` (public)

Get current reward of token for sender.




**Arguments:**
- *token* - Address of token.


**Returns:**
- *Reward* - of token for sender.

#### `lock(address token, uint256 amount)` (external)

Stacking token.




**Arguments:**
- *token* - Address of stacking token.

- *amount* - Amount of stacking token.

#### `unlock(address token)` (external)

Unstacking token.




**Arguments:**
- *token* - Address of unstacking token.

