# Weekend Project - Week-02

## Instructions

This is a group activity for at least 3 students:

- Develop and run scripts for “Ballot.sol” within your group to give voting rights, casting votes, delegating votes and querying results
- Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
- Submit your weekend project by filling the form provided in Discord
- Submit your code in a github repository in the form

## How to Use the Application

### Prerequisites

1. **Alchemy Account**: Obtain your `ALCHEMY_API_KEY`.
2. **Metamask Account**: Retrieve your `PRIVATE_KEY` from your wallet.
3. **ETH Sepolia Balance**: To interact with the smart contract, ensure you have a balance of ETH on the Sepolia testnet. You can acquire some from the [Google Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
4. **Environment Setup**: Create a `.env` file in the root directory of the application. You can copy and modify the variables from the provided [.env.example](.env.example) file.

### Installation

1. Install the necessary dependencies by running:

   ```bash
   npm install
   ```

### Interactions

1. **Deploy Contract**  
   Deploy the smart contract with your custom options (replace `option1`, `option2`, etc. with your own choices):

   ```bash
   npm run deploy-with-viem "option1" "option2" "option3" ...
   ```

2. **Assign Voting Rights**  
   This step is only for the `chairperson` identified during deployment. Replace the parameters with your contract address and wallet addresses:

   ```bash
   npm run give-voting-right "contractAddress" "wallet1" "wallet2" ...
   ```

3. **Cast a Vote**  
   This step is only for the `voter` who has been granted voting rights by the `chairperson`. Cast your vote by providing the contract address and your chosen option index:

   ```bash
   npm run cast-vote "contractAddress" "yourChoiceIndex"
   ```

4. **Delegate a Vote**  
   This step is only for the `voter` who has been granted voting rights by the `chairperson`. Delegate your vote to another address by providing the contract address and the delegator’s address:

   ```bash
   npm run delegate-to-vote "contractAddress" "delegatorAddress"
   ```

5. **Check Winning Proposal**  
   Check which proposal is currently winning by providing the contract address:

   ```bash
   npm run check-winning-proposal "contractAddress"
   ```

6. **Get Winner's Name**  
   Retrieve the name of the winning proposal by providing the contract address:

   ```bash
   npm run check-winner-name "contractAddress"
   ```

7. **View Proposals by Index**  
   View proposals by their index numbers. Replace the parameters with your contract address and the indexes you wish to view:

   ```bash
   npm run check-proposal-by-index "contractAddress" "0" "1" "2" ...
   ```

8. **Verify Voter Rights**  
   Check the voting rights of specific addresses by providing the contract address and the wallet addresses:

   ```bash
   npm run check-voter-right "contractAddress" "address1" "address2" "address3" ...
   ```

## Group 8 Participants

| Unique id | Discord username |
| --------- | ---------------- |
| c8ynre    | @tianbuyung      |
| gGe7Bg    | @ErZeTe          |
| ehpf16    | @Vins            |
| PCy7xD    | @Joosh75         |
| 4Qt1qT    | @0xOwenn         |

## Report

Please check into [CONTRACT INTERACTION REPORT](./reports/contract-interaction.md)
