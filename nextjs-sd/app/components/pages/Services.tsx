export default function Services() {
  return (
    <>
      <div className="flex-1 flex font-karla" id="features">
        <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
          <span className="transform -rotate-90 text-xl font-semibold font-karla">
            Features
          </span>
        </div>
        <div className="bg-primary p-8 min-h-screen border border-white border-l-0 border-r-0">
          <h2 className="text-[#F6FF95] text-2xl font-bold mb-6">
            Main Features
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-[#2F2F32] p-8 min-h-[150px] rounded-lg transition-transform duration-200 hover:scale-105">
                {" "}
                {/* Added transition and hover scale */}
                <p className="text-white text-lg sm:text-3xl">
                  Reward first commentors with SassyTokens
                </p>
              </div>
              <div className="bg-[#F6FF95] p-8 min-h-[150px] rounded-lg transition-transform duration-200 hover:scale-105">
                {" "}
                {/* Added transition and hover scale */}
                <p className="text-gray-900 text-lg sm:text-3xl">
                  Improve web3 e-commerce experience
                </p>
              </div>
              <div className="bg-[#F6FF95] col-span-2 p-8 min-h-[150px] rounded-lg transition-transform duration-200 hover:scale-105">
                {" "}
                {/* Added transition and hover scale */}
                <p className="text-gray-900 text-lg sm:text-3xl">
                  Built on top of scroll Layer 2 blockchain solutions
                </p>
              </div>
              <div className="bg-[#2F2F32] col-span-2 p-8 min-h-[150px] rounded-lg transition-transform duration-200 hover:scale-105">
                {" "}
                {/* Added transition and hover scale */}
                <p className="text-white text-lg sm:text-3xl">
                  Reward first commentors with SassyTokens
                </p>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-4">
              <div className="bg-[#F6FF95] p-8 min-h-[150px] rounded-lg transition-transform duration-200 hover:scale-105">
                {" "}
                {/* Added transition and hover scale */}
                <p className="text-gray-900 text-lg sm:text-3xl">
                  Decentralized dispute resolver
                </p>
              </div>
              <div className="bg-[#2F2F32] row-span-2 p-8 min-h-[150px] rounded-lg transition-transform duration-200 hover:scale-105">
                {" "}
                {/* Added transition and hover scale */}
                <p className="text-white text-lg sm:text-3xl">
                  Solve dispute cases between seller and buyer effectively
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
