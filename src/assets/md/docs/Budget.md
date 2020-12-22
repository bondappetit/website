## `Budget`





### Events
#### `ExpenditureChanged(address recipient, uint256 min, uint256 target)`

An event emitted when expenditure item changed.



#### `Payed(address recipient, uint256 amount)`

An event emitted when expenditure item payed.




### Variables
#### `mapping(address => struct Budget.Expenditure) expenditures`

#### `struct EnumerableSet.AddressSet recipients`


### Functions
#### `receive()` (external)





#### `changeExpenditure(address recipient, uint256 min, uint256 target)` (external)

Change expenditure item.




**Arguments:**
- *recipient* - Recipient address.

- *min* - Minimal balance for payment.

- *target* - Target balance.

#### `transferETH(address payable recipient, uint256 amount) → bool` (external)

Transfer ETH to recipient.




**Arguments:**
- *recipient* - Recipient.

- *amount* - Transfer amount.

#### `getRecipients() → address[]` (external)

Return all recipients addresses.




**Returns:**
- *Recipients* - addresses.

#### `deficitTo(address recipient) → uint256` (public)

Return balance deficit of recipient.




**Arguments:**
- *recipient* - Target recipient.


**Returns:**
- *Balance* - deficit of recipient.

#### `deficit() → uint256` (public)

Return summary balance deficit of all recipients.




**Returns:**
- *Summary* - balance deficit of all recipients.

#### `pay()` (external)

Pay ETH to all recipients with balance deficit.



