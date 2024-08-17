# Contract Interaction

## Scenario

### Rama/ErZeTe's interaction

1. Copied [Ballot.sol contract](../contracts/Ballot.sol) from Solidity docs and then compile it

2. Deploy the ballot contract using Viem with 3 proposals ["Cats", "Dogs", and "Rats"]. The contract address is `0x42d7182a133d090ee3f7624b5afe0133bf047e7d` with the transaction hash: [0xe1693be084f4907771637b6531b01500416b7b45c25c8f26505f6b8a14e73b18](https://sepolia.etherscan.io/tx/0xe1693be084f4907771637b6531b01500416b7b45c25c8f26505f6b8a14e73b18)
    ![Deploying contract using viem](<Screenshot 2024-08-17 214919.png>)

3. Run the [GiveVotingRight.ts](../scripts/GiveVotingRight.ts) script as the chairperson to give voting rights to all members of the team. With the following transactions hashes:
    - [0x901ac13e7d460567808dfc926bc8d36f46f403c83a632480f4e98213229532c9](https://sepolia.etherscan.io/tx/0x901ac13e7d460567808dfc926bc8d36f46f403c83a632480f4e98213229532c9)
    - [0x86d1e6e5159a996b276fab8dcfdb4206221edc029c48ab8fdee2c56cfe685b48](https://sepolia.etherscan.io/tx/0x86d1e6e5159a996b276fab8dcfdb4206221edc029c48ab8fdee2c56cfe685b48)
    - [0x9efdb03860097d5f685aa92c5d3bb0336b7383768d5a2cbe8a682fe6bf42dc8a](https://sepolia.etherscan.io/tx/0x9efdb03860097d5f685aa92c5d3bb0336b7383768d5a2cbe8a682fe6bf42dc8a)
    - [0x820554b844a9a0614cea07c1e8955ba4741223f9ea64ac4dcf6d61a588ed8d96](https://sepolia.etherscan.io/tx/0x820554b844a9a0614cea07c1e8955ba4741223f9ea64ac4dcf6d61a588ed8d96)

    ![Give voting right to team members](<Screenshot 2024-08-17 220045.png>)

4. Run the [CastVote.ts](../scripts/CastVote.ts) script to cast my vote to proposal with the index 1. 
Transaction hash: [0x60ef332c53e5ddf40ca33865b6647e525107a235a4d5dca4fdb115905136be01](https://sepolia.etherscan.io/tx/0x60ef332c53e5ddf40ca33865b6647e525107a235a4d5dca4fdb115905136be01)
    ![Run script to cast vote](<Screenshot 2024-08-17 220844.png>)

5. Run the [CheckTheWinnerName.ts](../scripts/CheckTheWinnerName.ts) script to see the current proposal winner after I casted my vote.
    ![Check current winner](<Screenshot 2024-08-17 221117.png>)

