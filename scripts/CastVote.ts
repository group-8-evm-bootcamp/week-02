import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { hexToString } from "viem";
import * as dotenv from "dotenv";
import { publicClient, walletClient } from "../helpers/client";
dotenv.config();

async function main() {
    // npx ts-node --files ./scripts/CastVote.ts [contractAddress]

    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 2)
      throw new Error("Parameters not provided");
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");
    const proposalIndex = parameters[1];
    if (isNaN(Number(proposalIndex))) throw new Error("Invalid proposal index");

    console.log("Proposal selected: ");
    const proposal = (await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "proposals",
      args: [BigInt(proposalIndex)],
    })) as any[];
    const name = hexToString(proposal[0], { size: 32 });
    console.log(`Voting to proposal "${name}"`);

    const hash = await walletClient.writeContract({
        address: contractAddress,
        abi,
        functionName: "vote",
        args: [BigInt(proposalIndex)],
    });
    console.log("Transaction hash:", hash);
    console.log("Waiting for confirmations...");
    await publicClient.waitForTransactionReceipt({ hash });
    console.log(`You successfully voted to proposal "${name}"`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});