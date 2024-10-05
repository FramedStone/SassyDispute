import { Search } from "lucide-react";

export default function Searchbar() {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="搜尋社團/作者名字"
        className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
}
