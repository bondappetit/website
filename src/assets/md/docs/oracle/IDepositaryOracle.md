## `IDepositaryOracle`





### Events
#### `Update(string isin, uint256 amount)`



Emitted when the depositary update.


### Variables

### Functions
#### `put(string isin, uint256 amount)` (external)

Write a security amount to the storage mapping.




**Arguments:**
- *isin* - International securities identification number.

- *amount* - Amount of securities.

#### `get(string isin) → struct IDepositaryOracle.Security` (external)

Get amount securities.




**Arguments:**
- *isin* - International securities identification number.


**Returns:**
- *amount* - Amount of securities.

#### `all() → struct IDepositaryOracle.Security[]` (external)

Get all depositary securities.




**Returns:**
- *All* - securities.

