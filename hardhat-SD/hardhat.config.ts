import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io" || "",
      accounts: [
        "6353790dfd40e2b1a07322384a3f78aa1bf1de33f46bf4ef9033564eeeb61fdb",
      ],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: "M4UK28RICB5BEUU1HKDD2SX1NMBNYYDTWN",
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
