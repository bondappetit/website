## `AgregateDepositaryBalanceView`





### Events
#### `DepositaryAdded(address depositary)`

An event thats emitted when an new depositary added to agregate.



#### `DepositaryRemoved(address depositary)`

An event thats emitted when an depositary removed from agregate.




### Variables
#### `uint256 maxSize`

#### `uint256 decimals`

#### `contract IDepositaryBalanceView[] depositaries`

#### `mapping(address => uint256) depositariesIndex`


### Functions
#### `constructor(uint256 _decimals, uint256 _maxSize)` (public)





**Arguments:**
- *_decimals* - Decimals balance.

- *_maxSize* - Max number depositaries in agregate.

#### `size() → uint256` (public)





**Returns:**
- *Depositaries* - count of agregate.

#### `addDepositary(address depositary)` (external)

Add depositary address to agregate.




**Arguments:**
- *depositary* - Added depositary address.

#### `removeDepositary(address depositary)` (external)

Removed depositary address from agregate.




**Arguments:**
- *depositary* - Removed depositary address.

#### `balance() → uint256` (external)





