import Link from "next/link";

export default function TopHeader() {
  return (
    <header className="flex justify-between items-center p-4 bg-primary-background text-white">
      <div className="text-yellow-300 font-bold text-xl">LOGO HERE</div>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-yellow-300">
          Home
        </Link>
        <Link href="/my-project" className="hover:text-yellow-300">
          My Project
        </Link>
        <Link href="/contact" className="hover:text-yellow-300">
          Contact
        </Link>
      </nav>
      <button className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-full font-semibold">
        Dashboard
      </button>
    </header>
  );
}
