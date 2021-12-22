pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

// learn more: https://docs.openzeppelin.com/contracts/3.x/erc20

contract FreeToken is ERC20, Ownable {
  // ToDo: add constructor and mint tokens for deployer,
  //       you can use the above import for ERC20.sol. Read the docs ^^^

  constructor() public ERC20('Freedom', 'FREE') {
      _mint(msg.sender, 1000 * 10**18); // 1000 full tokens made of 10**18 parts
  }
}
