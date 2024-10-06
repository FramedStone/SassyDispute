"use client";

import { useState } from "react";
import { Button } from "../components/ui";
import { Input } from "../components/ui";
import { Label } from "../components/ui";

// import SassyToken_abi from "../../public/contracts-abi/sassytoken.json";
// import SassyJuggler_abi from "../../public/contracts-abi/sassyjuggler.json";
import SassyBridge_abi from "../../public/contracts-abi/sassybridge.json";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui";

import * as dotenv from "dotenv";
import { ethers } from "ethers";
import TopHeader from "../components/pages/TopHeader";
import { useRouter } from "next/navigation";

dotenv.config();
const alchemyUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_URL;
const provider = new ethers.JsonRpcProvider(alchemyUrl);

// const SassyToken_ABI = SassyToken_abi;
// const SassyJuggler_ABI = SassyJuggler_abi;
const SassyBridge_ABI = SassyBridge_abi;

const ownerPrivateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY || "0x0123";
const SassyToken_Address = "0x4B84A50d3B8944F1D091C7CaE22c2f728e379446";
const SassyBridge_Address = "0xce0ea1ba79c9c9fe9984ce3535cd39e04d98d17e";

async function getSigner() {
  if (!window.ethereum) {
    console.error("MetaMask not installed");
    return;
  }

  // Request access to MetaMask accounts
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create a signer from the connected wallet (MetaMask)
  const web3Provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await web3Provider.getSigner();

  return signer;
}

async function startBridge(_disputeCasesAgreed: number, _holdDuration: number) {
  try {
    const signer = await getSigner();
    if (!signer) {
      console.error("No signer available");
      return;
    }

    // Create a contract instance with the signer
    const contract_bridge = new ethers.Contract(
      SassyBridge_Address,
      SassyBridge_ABI,
      signer
    );

    // Example: Sending a transaction (write function)
    const ownerSigner = new ethers.Wallet(ownerPrivateKey, provider);
    const contract_bridge_owner = new ethers.Contract(
      SassyBridge_Address,
      SassyBridge_ABI,
      ownerSigner
    );

    // grant partner role
    const tx_grantRolePartner = await contract_bridge_owner.grantRole(
      ethers.id("PARTNER"),
      signer.address
    );
    console.log(
      "granted ",
      signer.address,
      " role: PARTNER - ",
      tx_grantRolePartner
    );

    // setBridge()
    const tx_setBridge = await contract_bridge.setBridge(
      ownerSigner.address,
      signer.address,
      _disputeCasesAgreed,
      SassyToken_Address,
      BigInt(0),
      _holdDuration
    );

    console.log(
      "set_bridge() called by: ",
      signer.address,
      " - ",
      tx_setBridge
    );
  } catch (err) {
    console.error(err);
  }
}

export default function ValueSubmission() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // This would typically come from an environment variable or API call
  const contractAddress = SassyBridge_Address;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError("Please enter a number greater than 0.");
      return;
    }

    // setBridge()
    startBridge(10, 10);

    setShowPopup(true);
  };

  return (
    <>
      <TopHeader />
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="value">Enter Value</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter a number greater than 0"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Submit
            </Button>
          </form>

          <Dialog open={showPopup} onOpenChange={setShowPopup}>
            <DialogContent className="bg-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle>Smart Contract Address</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-zinc-400 mb-2">
                  The smart contract address is:
                </p>
                <a
                  href={`https://sepolia.scrollscan.com/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono bg-zinc-700 p-3 rounded-md break-all inline-block hover:bg-zinc-600 transition-colors"
                >
                  {contractAddress}
                </a>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setShowPopup(false);
                    router.push("/Cases");
                  }}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
