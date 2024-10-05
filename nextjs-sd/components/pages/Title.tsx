import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Title() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    // Set initial active hash when component mounts
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // This effect is triggered when `activeHash` changes
  useEffect(() => {
    // If the pathname is "/" and there is no hash, set the active hash to "#"
    if (pathname === "/" && !activeHash) {
      setActiveHash("#");
    }
  }, [activeHash, pathname]);

  return (
    <div className="flex-1 flex" id="home">
      <div className="w-16 border border-white border-l-0 text-white flex items-center justify-center">
        <span className="transform -rotate-90 text-xl font-semibold">Home</span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-16 border border-white py-5 border-l-0 border-r-0">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">
          <span className="block">Resolve</span>
          <span className="block">with</span>
          <span className="text-yellow-300">confidence</span>
        </h1>
        <Link
          href="/look"
          className="inline-flex items-center justify-between bg-yellow-300 text-gray-900 px-6 py-3 rounded-full font-semibold mt-4 max-w-48"
        >
          <span>Take A Look</span>
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
      <div className="w-48 border border-white text-white flex flex-col text-right px-4 py-8 space-y-4">
        {["Home", "My Project", "Contact"].map((item, index) => {
          const id = item.replace(" ", "").toLowerCase();
          // Check if the item is active
          const isActive =
            activeHash === `#${id}` ||
            (pathname === "/" && item === "Home" && activeHash === "#");

          return (
            <span
              key={index}
              className={`cursor-pointer px-2 py-1 transition-colors duration-200 
              ${isActive ? "text-primary-text" : ""} 
              hover:bg-white hover:text-black`}
              onClick={() => {
                router.push(`#${id}`);
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
