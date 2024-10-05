// TermsSubmission.tsx
"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui";
import { FC } from "react";

interface TermsSubmissionProps {
  onConfirm: () => void;
}

const TermsSubmission: FC<TermsSubmissionProps> = ({ onConfirm }) => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="bg-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Confirm Terms</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-zinc-400 mb-2">
            Please confirm you accept the terms.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={onConfirm}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsSubmission;
