## `Issuer`





### Events
#### `TransferTreasury(address newTreasury)`

An event thats emitted when an Treasury contract transfered.



#### `Rebalance()`

An event thats emitted when an ABT total supply rebalanced.




### Variables
#### `contract ABT abt`

#### `address treasury`


### Functions
#### `constructor(address _abt, address _treasury)` (public)





**Arguments:**
- *_abt* - ABT contract address.

- *_treasury* - Treasury contract address.

#### `changeTreasury(address _treasury)` (external)

Transfer Treasury contract to new address.




**Arguments:**
- *_treasury* - New address Treasury contract.

#### `rebalance()` (external)

Rebalance ABT total supply by depositary balance. Mint ABT tokens if depositary balance greater token total supply and burn otherwise.



