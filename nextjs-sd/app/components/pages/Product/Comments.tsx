"use client";

import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Button, Textarea } from "../../../components/ui";
import { ethers } from "ethers";
import SassyToken_abi from "@/public/contracts-abi/sassytoken.json";
import { useParams } from "next/navigation";

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
  const { id: disputeCaseId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const loadCommentsFromIPFS = useCallback(
    async (url: string) => {
      try {
        setUploading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch comments from IPFS");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error loading comments from IPFS:", error);
        toast({
          title: "Error",
          description: "Failed to load comments. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    const savedIpfsUrl = localStorage.getItem(`comments_${disputeCaseId}`);
    if (savedIpfsUrl) {
      setIpfsUrl(savedIpfsUrl);
      loadCommentsFromIPFS(savedIpfsUrl);
    }
  }, [disputeCaseId, loadCommentsFromIPFS]);

  const uploadToIPFS = async (content: any) => {
    try {
      setUploading(true);
      const file = new File(
        [JSON.stringify(content)],
        `comments_${disputeCaseId}.json`,
        {
          type: "application/json",
        }
      );
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      if (!uploadRequest.ok) {
        throw new Error("Failed to upload comments to IPFS");
      }
      const newIpfsUrl = await uploadRequest.json();
      setIpfsUrl(newIpfsUrl);
      localStorage.setItem(`comments_${disputeCaseId}`, newIpfsUrl);
      return newIpfsUrl;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: localStorage.getItem("walletAddress") || "Anonymous",
        content: newComment.trim(),
      };
      const updatedComments = [newCommentObj, ...comments];
      setComments(updatedComments);
      setNewComment("");

      try {
        // Upload updated comments to IPFS
        const newIpfsUrl = await uploadToIPFS(updatedComments);
        toast({
          title: "Comment submitted",
          description: `Your comment has been added and uploaded to IPFS.`,
        });

        // Token transfer logic
        const signer = await getSigner();
        if (!signer) {
          throw new Error("No signer available");
        }

        const recipientAddress = await signer.getAddress();
        const ownerSigner = new ethers.Wallet(ownerPrivateKey, provider);
        const contract_token = new ethers.Contract(
          SassyToken_Address,
          SassyToken_ABI,
          ownerSigner
        );

        const value = ethers.parseEther("1");

        console.log("Attempting transfer...");
        const tx_transfer = await contract_token.transfer(
          recipientAddress,
          value,
          { gasLimit: 100000 }
        );

        console.log("Transfer transaction hash:", tx_transfer.hash);
        const receipt = await tx_transfer.wait();
        console.log("Transfer transaction receipt:", receipt);

        if (receipt.status === 0) {
          throw new Error("Transaction failed");
        }

        console.log("Transfer transaction completed successfully");

        toast({
          title: "Token transferred",
          description: "Tokens have been transferred successfully.",
        });
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
          <h2 className="text-xl font-bold mb-4">
            Comments for Case {disputeCaseId}
          </h2>
          <form onSubmit={handleSubmitComment} className="mb-6">
            <Textarea
              placeholder="Drop Your Opinion Here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full mb-2"
              rows={4}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="ghost"
                className="text-black"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
                {!uploading && <span className="ml-2">→</span>}
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
