import { formatEther } from "viem";

import { connectToBlockchainWithRPC } from "../helpers/connectToBlockchainWithRPC";
import { userConnectWallet } from "../helpers/userConnectWallet";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";

async function main() {
  // npx ts-node --files ./scripts/DelegateToVote.ts "ballotContractAddress" "delegatorAddress"

  // --- Check the parameters ---
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");

  const contractAddress = parameters[0] as `0x${string}`;
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");

  const delegator = parameters[1] as `0x${string}`;
  if (!delegator) throw new Error("Delegator address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(delegator))
    throw new Error("Invalid delegator address");

  // --- Connect to Sepolia network with RPC ---

  const publicClient = await connectToBlockchainWithRPC();
  const blockNumber = await publicClient.getBlockNumber();
  console.log("\nLast block number:", blockNumber);

  console.log("Delegate your right to delagtor", delegator);
  console.log("Confirm? (Y/n)");

  // --- Connect to the voter wallet ---

  const voter = await userConnectWallet();
  console.log("Voter address:", voter.account.address);

  const balance = await publicClient.getBalance({
    address: voter.account.address,
  });
  console.log(
    "Voter balance:",
    formatEther(balance),
    voter.chain.nativeCurrency.symbol
  );

  // --- Confirmation the selection ---

  const stdin = process.stdin;

  stdin.addListener("data", async function (d) {
    if (d.toString().trim().toLowerCase() != "n") {
      const hash = await voter.writeContract({
        address: contractAddress,
        abi,
        functionName: "delegate",
        args: [delegator],
      });

      console.log("Transaction hash:", hash);
      console.log("Waiting for confirmations...");

      await publicClient.waitForTransactionReceipt({ hash });

      console.log("Transaction confirmed");
    } else {
      console.log("Operation cancelled");
    }
    process.exit();
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
