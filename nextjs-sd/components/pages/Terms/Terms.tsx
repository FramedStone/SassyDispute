// TermsAndConditions.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox } from "@/app/components/ui";
import TopHeader from "@/app/components/pages/TopHeader";
import TermsSubmission from "./TermsSubmission";

export default function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);
  const [showTermsSubmission, setShowTermsSubmission] = useState(false);
  const router = useRouter();

  const handleProceed = () => {
    if (isChecked) {
      setShowTermsSubmission(true); // Show TermsSubmission
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  const handleConfirm = () => {
    router.push("/next-page"); // Replace with your actual next page route
  };

  return (
    <>
      <TopHeader />
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

          <ol className="list-decimal space-y-8 ml-6">
            <li>
              <p className="mb-4">
                When exporting the data of the dispute cases, it must follow the
                JSON schema shown below...
              </p>
              <Image
                src="/placeholder.svg"
                alt="JSON Schema"
                width={600}
                height={200}
                className="bg-zinc-700 w-full h-40 object-cover"
              />
            </li>
            {/* Additional list items */}
          </ol>

          <div className="flex items-center space-x-2 mt-8">
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              className="border-zinc-500 text-zinc-500 focus:ring-zinc-500"
            />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I accept the terms & conditions of this agreement.
            </label>
          </div>

          <Button
            className="w-full mt-8 bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleProceed}
            disabled={!isChecked}
          >
            Next
          </Button>

          {/* Conditionally render the TermsSubmission component */}
          {showTermsSubmission && <TermsSubmission onConfirm={handleConfirm} />}
        </div>
      </div>
    </>
  );
}
