"use client";

import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../components/ui";
import { Button } from "../components/ui";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleProceed = () => {
    if (isChecked) {
      // Proceed to the next page
      router.push("/next-page"); // Replace with your actual next page route
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

        <ol className="list-decimal space-y-8 ml-6">
          <li>
            <p className="mb-4">
              When exporting the data of the dispute cases, it must follow the
              json schema shown below. This is to standardize the data that we
              receive from all our providers regarding to the disputate cases.
            </p>
            <Image
              src="/placeholder.svg"
              alt="JSON Schema"
              width={600}
              height={200}
              className="bg-zinc-700 w-full h-40 object-cover"
            />
          </li>

          <li>
            <p className="mb-4">
              To understand our exchange rate for our Sassytokens, please refer
              to the guideline below.
            </p>
            <Image
              src="/placeholder.svg"
              alt="Exchange Rate Guideline"
              width={600}
              height={200}
              className="bg-zinc-700 w-full h-40 object-cover"
            />
          </li>

          <li>
            <p>
              Once you have decided to bridge, you must have the dispute cases
              ready to be exported from your smart contract to ours.
            </p>
          </li>
        </ol>

        <div className="flex items-center space-x-2 mt-8">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            className="border-zinc-500 text-zinc-500 focus:ring-zinc-500 data-[state=checked]:bg-zinc-500 data-[state=checked]:text-white"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept to the terms & conditions of this agreement.
          </label>
        </div>

        <Button
          className="w-full mt-8 bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleProceed}
          disabled={!isChecked}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
