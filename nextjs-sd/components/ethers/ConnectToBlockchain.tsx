"use client";

import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";

interface ConnectToBlockchainProps {
  onWalletConnect: (address: string, walletType: string) => void;
}

const ConnectToBlockchain: React.FC<ConnectToBlockchainProps> = ({
  onWalletConnect,
}) => {
  const connectWallet = async (providerType: string) => {
    let provider;
    let walletType;

    try {
      // MetaMask Provider
      if (providerType === "MetaMask") {
        if (
          typeof window.ethereum !== "undefined" &&
          window.ethereum.isMetaMask
        ) {
          provider = new ethers.BrowserProvider(window.ethereum);
          walletType = "MetaMask";
        } else {
          console.error("MetaMask provider not found.");
          return;
        }

        // WalletConnect Provider
      } else if (providerType === "WalletConnect") {
        const walletConnectProvider = await EthereumProvider.init({
          projectId: "b197359b9ae78691e8ce85b034bd41d9",
          chains: [1, 9999],
          rpcMap: {
            1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            9999: "https://rpc.reown.network",
          },
          showQrModal: true,
        });

        await walletConnectProvider.enable();
        provider = new ethers.BrowserProvider(walletConnectProvider);
        walletType = "WalletConnect";
      } else if (
        providerType === "Bitget" &&
        typeof window.bitkeep !== "undefined" &&
        window.bitkeep.ethereum
      ) {
        if (isEip1193Provider(window.bitkeep.ethereum)) {
          provider = new ethers.BrowserProvider(window.bitkeep.ethereum);
          walletType = "Bitget";
        } else {
          console.error(
            "Bitget Wallet's ethereum provider is not a valid EIP-1193 provider"
          );
          return;
        }
      } else {
        console.error("No provider found");
        return;
      }

      const accounts = await provider.send("eth_requestAccounts", []);
      const walletAddress = accounts[0];
      onWalletConnect(walletAddress, walletType);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Connection request reset")
      ) {
        console.warn("User canceled WalletConnect request.");
      } else {
        console.error("Error connecting to wallet:", error);
      }
    }
  };

  function isEip1193Provider(
    provider: unknown
  ): provider is ethers.Eip1193Provider {
    return (provider as ethers.Eip1193Provider).request !== undefined;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>Connect Wallet</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem onClick={() => connectWallet("MetaMask")}>
          Connect MetaMask
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => connectWallet("WalletConnect")}>
          Connect WalletConnect
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => connectWallet("Bitget")}>
          Connect Bitget
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectToBlockchain;
