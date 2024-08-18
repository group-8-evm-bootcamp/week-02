import { createPublicClient, http, createWalletClient } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"
import * as dotenv from "dotenv"
dotenv.config()

const providerApiKey = process.env.ALCHEMY_API_KEY || ""
const deployerPrivateKey = process.env.PRIVATE_KEY || ""

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
})

const account = privateKeyToAccount(`0x${deployerPrivateKey}`)
export const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
})
