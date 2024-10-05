import Filter from "@/components/pages/Product/filter";
import Content from "@/components/pages/Product/Content";
import TopHeader from "@/components/pages/TopHeader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopHeader />
      <div className="flex flex-1">
        <Filter />
        <Content />
      </div>
    </div>
  );
}
