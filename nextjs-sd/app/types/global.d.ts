import { EthereumProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    bitkeep?: {
      ethereum: unknown;
    };
  }
}
