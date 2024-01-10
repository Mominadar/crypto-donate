import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'SBqqTm_FucEpHuc1NLuv5VPgVnIR6nKN', // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};



export const alchemy = new Alchemy(settings);
