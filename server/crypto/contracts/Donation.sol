// Solidity version
pragma solidity ^0.8.0;

// Define the smart contract
contract DonationContract {
    // Address of the owner (creator) of the contract
    address public owner;

    // Event triggered on successful donation
    event DonationReceived(address indexed donor, uint256 amount);

    // Constructor to set the owner as the one deploying the contract
    constructor() {
        owner = msg.sender;
    }

    // Modifier to ensure that only the owner can perform certain actions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Function to receive donations
    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        // Emit an event to log the donation
        emit DonationReceived(msg.sender, msg.value);
    }

    // Function to withdraw the donated funds, only callable by the owner
    function withdrawFunds() external onlyOwner {
        // Transfer the entire contract balance to the owner
        payable(owner).transfer(address(this).balance);
    }

    // Function to get the current balance of the contract
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
