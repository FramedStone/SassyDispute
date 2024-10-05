import Searchbar from "./searchbar";

export default function Content() {
  return (
    <div className="flex-1 bg-gray-900 p-4">
      <Searchbar />
      <div className="mt-4">{/* Add your main content here */}</div>
    </div>
  );
}
