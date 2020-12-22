## `Vesting`





### Events
#### `Locked(uint256 periodId)`

An event emitted when locking a period.



#### `Revoked(uint256 periodId)`

An event emitted when revoked a period.



#### `Withdrawal(address recipient, uint256 periodId)`

An event emitted when withdrawal a period.




### Variables
#### `contract Bond bond`

#### `uint256 currentPeriod`

#### `struct EnumerableSet.AddressSet participants`

#### `mapping(address => mapping(uint256 => struct Vesting.Period)) periods`

#### `mapping(address => uint256[]) periodsIndex`


### Functions
#### `maxPeriodsPerRecipient() → uint256` (public)

The number of periods for a per recipient.



#### `constructor(address _bond)` (public)





**Arguments:**
- *_bond* - Address of Bond token contract.

#### `lock(address recipient, uint256 amount, uint256 date) → uint256` (external)

Add new period.




**Arguments:**
- *recipient* - Recipient of reward.

- *amount* - Reward amount.

- *date* - Date of unlockd period.


**Returns:**
- *Added* - period identifier.

#### `revoke(address recipient, uint256 periodId)` (external)

Revoke period.




**Arguments:**
- *recipient* - Recipient of reward.

- *periodId* - Period identifier.

#### `getParticipants() → address[]` (external)

Return all participants addresses.




**Returns:**
- *Participants* - addresses.

#### `info(address recipient) → struct Vesting.Period[]` (external)

Get information of period.




**Arguments:**
- *recipient* - Recipient address.


**Returns:**
- *Recipient* - periods list.

#### `withdraw(uint256 periodId)` (external)

Withdraw reward.




**Arguments:**
- *periodId* - Target period identifier.

