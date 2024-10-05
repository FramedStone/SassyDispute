import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import WalletComponents from "./Wallet/WalletComponents";

export default function TopHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex justify-between items-center p-4 bg-primary text-white font-karla">
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src={"/logo-no-background.png"}
          width={100}
          height={100}
          alt="logo"
        />
      </div>
      <nav className="space-x-4">
        <Link
          href="/"
          className={`hover:text-yellow-300 ${
            pathname === "/" ? "text-yellow-300" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/Cases"
          className={`hover:text-yellow-300 ${
            pathname.startsWith("/Cases") ? "text-yellow-300" : ""
          }`}
        >
          Cases
        </Link>
      </nav>
      <WalletComponents />
    </header>
  );
}
