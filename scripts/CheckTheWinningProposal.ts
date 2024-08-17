import { formatUnits } from "viem";

import { connectToBlockchainWithRPC } from "../helpers/connectToBlockchainWithRPC";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";

async function main() {
  // npx ts-node --files ./scripts/CheckTheWinningProposal.ts "ballotContractAddress"

  // --- Check the parameters ---
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 1)
    throw new Error("Parameters not provided");

  const contractAddress = parameters[0] as `0x${string}`;
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");

  // --- Connect to Sepolia network with RPC ---

  const publicClient = await connectToBlockchainWithRPC();
  const blockNumber = await publicClient.getBlockNumber();
  console.log("\nLast block number:", blockNumber);

  // --- Check the winning proposal ---

  console.log(`\nCheck the wining proposal...`);
  const checkTheWinningProposalIndex = (await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "winningProposal",
    args: [],
  })) as any;

  console.log("Result of winning proposal:");
  console.log("Index:", formatUnits(checkTheWinningProposalIndex, 0)); // The index of the winning proposal
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
