import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { Address } from "viem";
import { ADDRESS_REGEX } from "../helpers/constant";
import { publicClient, walletClient } from "../helpers/client";

async function main() {
    // npx ts-node --files ./scripts/GiveVotingRight.ts [contractAddress] [wallet1] [wallet2]...

    //-- Get contractAddress from args
    const [contractAddress, ...votersAddress] = process.argv.slice(2) as Address[];

    //-- Validate contractAddress and votersAddress
    if (!contractAddress) {
      throw new Error("Contract address should be provided as first argument")
    }

    if (votersAddress.length < 1) {
      throw new Error(
        "Voters address should be provided as second (or more) argument"
      )
    }

    Array.from([contractAddress, ...votersAddress]).forEach((address, i) => {
      if (!ADDRESS_REGEX.test(address)) {
        if (i === 0) {
          throw new Error(`Invalid contract address: ${address}`)
        } else {
          throw new Error(`Invalid voter address: ${address}`)
        }
      }
    })

    //-- Check if the wallet address is the chairperson (only chairperson can give voting rights)
    const chairpersonAddress = (await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "chairperson",
    })) as Address

    if (chairpersonAddress !== walletClient.account.address) {
      throw new Error("Only the chairperson can give voting rights")
    }

    //-- For each wallet address in wallets, give them rights to vote IF the address is correct
    for (const voterAddress of votersAddress) {
        console.log(`\nGiving ${voterAddress} right to vote...`);
        const hash = await walletClient.writeContract({
            address: contractAddress,
            abi,
            functionName: "giveRightToVote",
            args: [voterAddress],
        });

        
        console.log("Transaction hash:", hash);
        console.log("Waiting for confirmations...");
        await publicClient.waitForTransactionReceipt({ hash });
        
        console.log(`Wallet ${voterAddress} has been given a right to vote`);
    };

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});