import { formatEther, toHex, Address, hexToString } from "viem";
import { publicClient, walletClient } from "../helpers/client";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";

async function main() {
    // npm run deploy-with-viem "arg1" "arg2" "arg3"
    
    // Take arguments and cut the first two args as it's not needed
    const proposals = process.argv.slice(2);
    if (!proposals || proposals.length < 1)
        throw new Error("Proposals not provided");

    //-- Create public client to connect with sepolia using Alchemy
    const blockNumber = await publicClient.getBlockNumber();
    console.log("Last block number:", blockNumber);

    //-- Connect the wallet account that we're going to deploy with
    console.log("Deployer address:", walletClient.account.address);
    const balance = await publicClient.getBalance({
      address: walletClient.account.address,
    });
    console.log(
      "Deployer balance:",
      formatEther(balance),
      walletClient.chain.nativeCurrency.symbol
    );

    //-- Deploying the contract on Sepolia network
    console.log("\nDeploying Ballot contract");
    const hash = await walletClient.deployContract({
      abi,
      bytecode: bytecode as Address,
      args: [proposals.map((prop) => toHex(prop, { size: 32 }))],
    });
    console.log("Transaction hash:", hash);
    console.log("Waiting for confirmations...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Ballot contract deployed to:", receipt.contractAddress);
    
    //-- Trying to read the variable from the contract
    if (!receipt.contractAddress) {
        console.log("Contract deployment failed");
        return;
    }

    console.log("Proposals: ");
    for (let index = 0; index < proposals.length; index++) {
      const proposal = (await publicClient.readContract({
        address: receipt.contractAddress as Address,
        abi,
        functionName: "proposals",
        args: [BigInt(index)],
      })) as any[];
      const name = hexToString(proposal[0], { size: 32 });
      console.log({ index, name, proposal });
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});