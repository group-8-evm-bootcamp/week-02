import { hexToString, formatUnits } from "viem";

import { connectToBlockchainWithRPC } from "../helpers/connectToBlockchainWithRPC";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";

async function main() {
  // npx ts-node --files ./scripts/CheckTheProposalByIndex.ts "ballotContractAddress" "0" "1" "2"...

  // --- Check the parameters ---
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");

  const contractAddress = parameters[0] as `0x${string}`;
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");

  // --- Get the wallet from args ---
  const proposals = parameters.slice(1);

  // --- Connect to Sepolia network with RPC ---

  const publicClient = await connectToBlockchainWithRPC();
  const blockNumber = await publicClient.getBlockNumber();
  console.log("\nLast block number:", blockNumber);

  // --- Check the Proposals ---

  console.log("Proposals: ");
  for (let index = 0; index < proposals.length; index++) {
    const proposal = (await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "proposals",
      args: [BigInt(proposals[index])],
    })) as any[];
    const name = hexToString(proposal[0], { size: 32 });
    const voteCount = formatUnits(proposal[1], 0);
    console.log({ index, name, voteCount });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
