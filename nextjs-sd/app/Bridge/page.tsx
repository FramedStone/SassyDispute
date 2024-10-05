"use client";

import { useState } from "react";
import { Button } from "../components/ui";
import { Input } from "../components/ui";
import { Label } from "../components/ui";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui";

export default function ValueSubmission() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // This would typically come from an environment variable or API call
  const contractAddress = "0x1234567890123456789012345678901234567890";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError("Please enter a number greater than 0.");
      return;
    }

    setShowPopup(true);
  };

  return (
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
              <p className="font-mono bg-zinc-700 p-3 rounded-md break-all">
                {contractAddress}
              </p>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setShowPopup(false)}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
