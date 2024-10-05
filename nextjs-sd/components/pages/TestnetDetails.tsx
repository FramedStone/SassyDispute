import Image from "next/image";
import { Button } from "@/components/ui";

export default function TestnetDetails() {
  return (
    <div className="flex-1 flex font-karla" id="actions">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold font-karla">
          Tesnet
        </span>
      </div>
      <div className="bg-[#2F2F32] text-black rounded-lg shadow-lg max-w-4xl mx-auto p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <Image
            src="/scroll.jpg"
            alt="Manta Network Logo"
            width={200}
            height={200}
            className="mb-4 mr-4"
          />
          <h1 className="text-4xl font-bold text-center md:text-right">
            Powered by Manta Network
          </h1>
        </div>

        <h2 className="text-3xl font-semibold mb-4">
          Layer 2 Blockchain Solution
        </h2>

        <p className="mb-4">
          web3resell leverages Manta Network's cutting-edge technology to
          provide:
        </p>

        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>High-performance layer 2 blockchain architecture</li>
          <li>Zero-knowledge proofs for enhanced privacy</li>
          <li>Scalability through ZK-rollups</li>
          <li>Interoperability with Ethereum and other chains</li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button variant="ghost">Manta Pacific Testnet</Button>
          <Button variant="ghost">Manta Atlantic Mainnet</Button>
        </div>
      </div>
    </div>
  );
}
