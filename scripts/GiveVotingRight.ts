import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import {hexToString, createPublicClient, http, createWalletClient, Address} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY;
const deployerPrivateKey = process.env.PRIVATE_KEY;

async function main() {
    // npx ts-node --files ./scripts/GiveVotingRight.ts [contractAddress] [wallet1] [wallet2]...

    //-- Get contractAddress from args
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 2)
      throw new Error("Parameters not provided");
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");

    //-- Get the wallet from args
    const wallets = parameters.slice(1);
    
    //-- Create public client to connect with sepolia using Alchemy
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });

    //-- Interact with the contract as the chairperson/deployer
    const account = privateKeyToAccount(`${deployerPrivateKey}` as Address);
    const chairperson = createWalletClient({
        account,
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });

    //-- For each wallet address in wallets, give them rights to vote IF the address is correct
    for (const walletAddress of wallets) {
        const wallet_ = walletAddress as `0x${string}`;
        if (!wallet_) return;
        if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
          console.log(`\nInvalid wallet address arg: ${wallet_}`);
          return;
        }

        console.log(`\nGiving ${walletAddress} right to vote...`);
        const hash = await chairperson.writeContract({
            address: contractAddress,
            abi,
            functionName: "giveRightToVote",
            args: [wallet_],
        });

        
        console.log("Transaction hash:", hash);
        console.log("Waiting for confirmations...");
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        
        console.log(`Wallet ${walletAddress} has been given a right to vote`);
    };

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});