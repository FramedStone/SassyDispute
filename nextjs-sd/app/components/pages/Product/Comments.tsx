"use client";

import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Avatar, Button, Textarea } from "../../ui";
import { ethers } from "ethers";
import SassyToken_abi from "../../../../public/contracts-abi/sassytoken.json";

const alchemyUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_URL;
const provider = new ethers.JsonRpcProvider(alchemyUrl);

const SassyToken_ABI = SassyToken_abi;

const ownerPrivateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY || "0x123";
const SassyToken_Address = "0x4B84A50d3B8944F1D091C7CaE22c2f728e379446";

async function getSigner() {
  if (!window.ethereum) {
    console.error("MetaMask not installed");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3Provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await web3Provider.getSigner();

  return signer;
}

interface Comment {
  id: number;
  author: string;
  content: string;
}

export default function Comments() {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: localStorage.getItem("walletAddress") || "Anonymous",
        content: newComment.trim(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      toast({
        title: "Comment submitted",
        description: "Your comment has been added successfully.",
      });

      try {
        const signer = await getSigner();
        if (!signer) {
          console.error("No signer available");
          return;
        }

        const recipientAddress = await signer.getAddress();
        const ownerSigner = new ethers.Wallet(ownerPrivateKey, provider);
        const contract_token = new ethers.Contract(
          SassyToken_Address,
          SassyToken_ABI,
          ownerSigner
        );

        // Prepare permit parameters
        const value = ethers.parseEther("1"); // Adjust the amount as needed
        const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
        const nonce = await contract_token.nonces(ownerSigner.address);
        const name = await contract_token.name();
        const version = "1"; // Make sure this matches your contract's version

        // Create the permit signature
        const domain = {
          name: name,
          version: version,
          chainId: (await provider.getNetwork()).chainId,
          verifyingContract: SassyToken_Address,
        };

        const types = {
          Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        };

        const message = {
          owner: ownerSigner.address,
          spender: recipientAddress,
          value: value,
          nonce: nonce,
          deadline: deadline,
        };

        const signature = await ownerSigner.signTypedData(
          domain,
          types,
          message
        );
        const { v, r, s } = ethers.Signature.from(signature);

        console.log("Permit parameters:", {
          owner: ownerSigner.address,
          spender: recipientAddress,
          value: value.toString(),
          deadline,
          v,
          r,
          s,
        });

        // Call permit function
        const tx_permit = await contract_token.permit(
          ownerSigner.address,
          recipientAddress,
          value,
          deadline,
          v,
          r,
          s
        );

        await tx_permit.wait();
        console.log("Permit transaction completed");

        // Check allowance after permit
        const allowance = await contract_token.allowance(
          ownerSigner.address,
          recipientAddress
        );
        console.log("Allowance after permit:", allowance.toString());

        // Check balance before transfer
        const balance = await contract_token.balanceOf(ownerSigner.address);
        console.log("Balance before transfer:", balance.toString());

        if (balance < value) {
          throw new Error("Insufficient balance for transfer");
        }

        // Now call transferFrom
        try {
          console.log("Attempting transferFrom...");
          const tx_transfer = await contract_token.transferFrom(
            ownerSigner.address,
            recipientAddress,
            value,
            { gasLimit: 100000 } // Set a fixed gas limit
          );

          console.log("TransferFrom transaction hash:", tx_transfer.hash);
          const receipt = await tx_transfer.wait();
          console.log("Transfer transaction receipt:", receipt);

          if (receipt.status === 0) {
            throw new Error("Transaction failed");
          }

          console.log("Transfer transaction completed successfully");

          // Check balance after transfer
          const newBalance = await contract_token.balanceOf(
            ownerSigner.address
          );
          console.log("Balance after transfer:", newBalance.toString());

          toast({
            title: "Token transferred",
            description:
              "Tokens have been permitted and transferred successfully.",
          });
        } catch (error: unknown) {
          console.error("Transfer error:", error);

          if (error instanceof Error) {
            console.log("Error message:", error.message);
            if ("code" in error) {
              console.log("Error code:", (error as { code: string }).code);
            }
            if ("transaction" in error) {
              console.log(
                "Failed transaction details:",
                (error as { transaction: unknown }).transaction
              );
            }
            if ("receipt" in error) {
              console.log(
                "Failed transaction receipt:",
                (error as { receipt: unknown }).receipt
              );
            }
          }

          throw new Error(
            `Transfer failed: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        }
      } catch (err: unknown) {
        console.error("Detailed error:", err);
        toast({
          title: "Error",
          description:
            err instanceof Error ? err.message : "An unknown error occurred",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-primary text-gray-100">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold font-karla">
          Comments
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <section className="bg-primary p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <Textarea
              placeholder="Drop Your Opinion Here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full mb-2"
              rows={4}
            />
            <div className="flex justify-end">
              <Button type="submit" variant="ghost" className="text-black">
                Submit
                <span className="ml-2">→</span>
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar className="w-10 h-10 bg-gray-600" />
                <div>
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-gray-400">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
