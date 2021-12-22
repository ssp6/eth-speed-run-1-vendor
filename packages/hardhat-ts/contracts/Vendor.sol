pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import './FreeToken.sol';

contract Vendor is Ownable {
    FreeToken freeToken;
    uint256 public constant tokensPerEth = 100;

    event BuyTokens(address buyer, uint256 amountOfEth, uint256 amountOfToken);

    constructor(address addressOfFreeTokenContract) public {
        freeToken = FreeToken(addressOfFreeTokenContract);
    }

    // Allows any user to buy FreeToken from the Vendor's supply (which is the full FreeToken supply)
    function buyTokens() external payable {
        uint256 amountOfFreeTokensToSend = msg.value * tokensPerEth;
        freeToken.transfer(msg.sender, amountOfFreeTokensToSend);

        emit BuyTokens(msg.sender, msg.value, amountOfFreeTokensToSend);
    }

    // Exchange FreeTokens for eth
    function sellTokens(uint256 amountOfTokensToSell) external {
        uint256 callersBalance = freeToken.balanceOf(msg.sender);
        require(callersBalance >= amountOfTokensToSell, "Not enough tokens to sell");

        bool result = freeToken.transferFrom(msg.sender, address(this), amountOfTokensToSell);
        require(result, "Transfer of tokens failed");
    }

    // For the owner to withdraw some of the eth in the contract
    function withdraw() external onlyOwner {
        (bool status, ) = msg.sender.call{value: address(this).balance}("Withdraw ALL of the funds from the vendor");
        require(status, "");
    }
}
