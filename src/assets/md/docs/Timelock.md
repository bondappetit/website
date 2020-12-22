## `Timelock`





### Events
#### `NewAdmin(address newAdmin)`





#### `NewPendingAdmin(address newPendingAdmin)`





#### `NewDelay(uint256 newDelay)`





#### `CancelTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`





#### `ExecuteTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`





#### `QueueTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`






### Variables
#### `uint256 GRACE_PERIOD`

#### `uint256 MINIMUM_DELAY`

#### `uint256 MAXIMUM_DELAY`

#### `address admin`

#### `address pendingAdmin`

#### `uint256 delay`

#### `mapping(bytes32 => bool) queuedTransactions`


### Functions
#### `constructor(address admin_, uint256 delay_)` (public)





#### `receive()` (external)





#### `setDelay(uint256 delay_)` (public)





#### `acceptAdmin()` (public)





#### `setPendingAdmin(address pendingAdmin_)` (public)





#### `__transferAdmin(address _newAdmin)` (public)





#### `queueTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) → bytes32` (public)





#### `cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta)` (public)





#### `executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) → bytes` (public)





