## `HighAlertOracle`





### Events
#### `ContractAdded(address addedContract)`

An event emitted when contract added to pausable list.



#### `ContractRemoved(address removedContract)`

An event emitted when contract removed at pausable list.



#### `PausedAll(string reason)`

An event emitted when paused all contracts.



#### `UnpausedAll(string reason)`

An event emitted when unpaused all contracts.




### Variables

### Functions
#### `addContract(address _contract)` (external)

Add contract to pausable list.




**Arguments:**
- *_contract* - Target contract.

#### `removeContract(address _contract)` (external)

Remove contract at pausable list.




**Arguments:**
- *_contract* - Target contract.

#### `getContracts() → address[]` (external)

Return all pausable contracts.




**Returns:**
- *Pausable* - contracts list.

#### `pauseAll(string reason)` (external)

Pause all pausable contracts.




**Arguments:**
- *reason* - Reason of pause.

#### `unpauseAll(string reason)` (external)

Unpause all pausable contracts.




**Arguments:**
- *reason* - Reason of unpause.

