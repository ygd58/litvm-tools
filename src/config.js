export const NETWORKS = {
  testnet: {
    name: "LitVM Testnet",
    rpcUrl: process.env.LITVM_RPC_URL || "https://rpc-testnet.litvm.com",
    chainId: process.env.LITVM_CHAIN_ID || "TBA",
    currency: "zkLTC",
    explorer: process.env.LITVM_EXPLORER || "https://explorer-testnet.litvm.com",
    bridge: "https://bridge.litvm.com",
  },
  mainnet: {
    name: "LitVM Mainnet",
    rpcUrl: process.env.LITVM_MAINNET_RPC || "https://rpc.litvm.com",
    chainId: process.env.LITVM_MAINNET_CHAIN_ID || "TBA",
    currency: "zkLTC",
    explorer: process.env.LITVM_MAINNET_EXPLORER || "https://explorer.litvm.com",
    bridge: "https://bridge.litvm.com",
  },
};

export function getNetwork(networkName = "testnet") {
  const net = NETWORKS[networkName];
  if (!net) throw new Error(`Unknown network: ${networkName}. Use 'testnet' or 'mainnet'.`);
  return net;
}
