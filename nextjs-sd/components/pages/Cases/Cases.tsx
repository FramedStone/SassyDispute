import { Button, Textarea } from "@/components/ui";
import React from "react";

const Cases = () => {
  // const router = useRouter();

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
            <h1 className="text-2xl font-bold mb-2">Lorem Ipsum Title</h1>
            <p className="text-sm text-gray-400 mb-4">Tharshen</p>

            {["A", "B", "C"].map((letter) => (
              <div key={letter} className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
                  Conversation {letter}:
                </p>
                <Textarea
                  className="w-full "
                  rows={3}
                  placeholder={letter === "C" ? "Enter Text" : ""}
                  readOnly={letter !== "C"}
                />
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-400">Created At: 12/11/24</p>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                >
                  Support Seller
                </Button>
                <Button
                  variant="outline"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                >
                  Support Merchant
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
