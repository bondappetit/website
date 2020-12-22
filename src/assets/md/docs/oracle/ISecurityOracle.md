## `ISecurityOracle`





### Events
#### `Update(string isin, string prop, bytes value)`



Emitted when the security property update.


### Variables

### Functions
#### `put(string isin, string prop, bytes value)` (external)

Put property value of security.




**Arguments:**
- *isin* - International securities identification number of security.

- *prop* - Property name of security.

- *value* - Property value.

#### `get(string isin, string prop) → bytes` (external)

Get property value of security.




**Arguments:**
- *isin* - International securities identification number of security.

- *prop* - Property name of security.


**Returns:**
- *Property* - value of security.

