import { InjectedConnector } from "@web3-react/injected-connector";

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);

// Add different connectors
export const injected = new InjectedConnector({
  // supportedChainIds: [1, 3, 4, 5, 42, 1337], // Change according to supported Network Ids
  supportedChainIds: [chainId], // Change according to supported Network Ids
  // supportedChainIds: [process.env.REACT_APP_CHAIN_ID], // Change according to supported Network Ids
  // supportedChainIds: [56], // Change according to supported Network Ids
});

