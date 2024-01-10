import { Network, Alchemy, Wallet, Utils } from 'alchemy-sdk';
import { db } from '~/utils/db.server';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};


export const alchemy = new Alchemy(settings);
export const wallet = new Wallet(process.env.WALLET_KEY!);

export async function sendTransaction(amount: number){
  const contract = await db.contract.findFirstOrThrow({where:{name:'Donation'}});

  const transaction = {
    to: contract.address,
    value: Utils.parseEther(amount.toString()),
    gasLimit: "2",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
    type: 2,
    chainId: 11155111,
  };

  const rawTransaction = await wallet.signTransaction(transaction);
  const response = await alchemy.transact.sendTransaction(rawTransaction)
  return response;
}
