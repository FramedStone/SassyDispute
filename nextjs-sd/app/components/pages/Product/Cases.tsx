"use client";

import React, { useState } from "react";
import { Button, Textarea } from "../../ui";
import { useRouter } from "next/navigation";

const disputeCase = {
  id: "1",
  title: "Dispute over Product XYZ",
  description:
    "Buyer claims the product received is defective, while the seller asserts that the product was shipped in perfect condition.",
  creator: "john doe",
  is_archived: false,
  created_at: "09:08:06",
  comments: [
    {
      id: "1",
      creator: "Tharshen",
      role: "buyer",
      comment:
        "The product I received is completely broken, and it doesn't work at all.",
      created_at: "09:08:06",
    },
    {
      id: "2",
      creator: "john doe",
      role: "seller",
      comment:
        "I shipped the product in perfect condition. You must have damaged it after receiving it.",
      created_at: "09:10:00",
    },
    {
      id: "3",
      creator: "Tharshen",
      role: "buyer",
      comment:
        "That's not true! It was broken right out of the box. I need a refund or a replacement.",
      created_at: "09:12:30",
    },
    {
      id: "4",
      creator: "john doe",
      role: "seller",
      comment:
        "Sorry, but I have proof from the courier that the package was intact when it was delivered.",
      created_at: "09:14:45",
    },
    {
      id: "5",
      creator: "Tharshen",
      role: "buyer",
      comment:
        "That doesn't mean the product wasn't defective when you sent it. I can send photos of the damage.",
      created_at: "09:16:00",
    },
    {
      id: "6",
      creator: "john doe",
      role: "seller",
      comment: "Please send the photos, and I will assess the situation.",
      created_at: "09:18:20",
    },
    {
      id: "7",
      creator: "Tharshen",
      role: "buyer",
      comment: "Photos sent. Check your messages. (img) (img)",
      created_at: "09:20:00",
    },
    {
      id: "8",
      creator: "john doe",
      role: "seller",
      comment:
        "What are you talking about? That looks like it was deliberately damage. Also, how come only your shipping has issues when many of customers never had any???",
      created_at: "09:22:10",
    },
  ],
};

const Cases = () => {
  const router = useRouter();
  const [opinion, setOpinion] = useState("");

  const handleSubmitOpinion = () => {
    // Here you would typically send the opinion to your backend
    console.log("Submitted opinion:", opinion);
    setOpinion("");
  };

  return (
    <>
      <div className="flex min-h-screen bg-primary text-gray-100">
        <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
          <span className="transform -rotate-90 text-xl font-semibold font-karla">
            Cases
          </span>
        </div>

        <div className="flex-1 flex flex-col p-6 border border-white border-l-0 border-r-0">
          <section className="bg-primary p-6 rounded-lg mb-6">
            <h1 className="text-2xl font-bold mb-2">{disputeCase.title}</h1>
            <p className="text-sm text-gray-400 mb-4">{disputeCase.creator}</p>

            {disputeCase.comments.map((comment, index) => (
              <div key={comment.id} className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
                  {comment.creator} ({comment.role}) - {comment.created_at}:
                </p>
                <Textarea
                  className="w-full"
                  rows={3}
                  value={comment.comment}
                  readOnly
                />
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-400">
                Created At: {disputeCase.created_at}
              </p>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  onClick={() => {
                    handleSubmitOpinion();
                    console.log("Supporting Buyer");
                  }}
                >
                  Support Buyer
                </Button>
                <Button
                  variant="outline"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                  onClick={() => {
                    handleSubmitOpinion();
                    console.log("Supporting Seller");
                  }}
                >
                  Support Seller
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Cases;
