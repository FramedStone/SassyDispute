"use client";

import React, { useState, useEffect } from "react";
import ConnectToBlockchain from "@/components/ethers/ConnectToBlockchain";
import WalletDropdown from "@/components/pages/Wallet/WalletDropdown";

const Testing = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // On component mount, check if wallet info is stored in localStorage
    const storedWalletAddress = localStorage.getItem("walletAddress");
    const storedIsConnected = localStorage.getItem("isConnected");

    if (storedWalletAddress && storedIsConnected === "true") {
      setWalletAddress(storedWalletAddress);
      setIsConnected(true);
    }
  }, []);

  const handleWalletConnect = (address: string, walletType: string) => {
    setIsConnected(true);
    setWalletAddress(address);
    console.log("Connected with", walletType, "Wallet:", address);

    // Store the wallet address and connection status in localStorage
    localStorage.setItem("walletAddress", address);
    localStorage.setItem("isConnected", "true");
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");

    // Remove wallet information from localStorage
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("isConnected");
  };

  return (
    <div>
      <h1>Test ConnectToBlockchain Component</h1>
      {!isConnected ? (
        <ConnectToBlockchain onWalletConnect={handleWalletConnect} />
      ) : (
        <WalletDropdown
          walletAddress={walletAddress}
          onDisconnect={handleDisconnectWallet}
        />
      )}
    </div>
  );
};

export default Testing;
