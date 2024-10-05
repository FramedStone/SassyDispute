import { SlidersHorizontal } from "lucide-react";

export default function Filter() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 border-r border-gray-800 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <SlidersHorizontal size={20} />
      </div>
      {/* Add filter options here */}
    </div>
  );
}
