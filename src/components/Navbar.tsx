import Link from "next/link";
import { Menu } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="  text-white p-4 flex items-center justify-between">
      <Link href="/" className="">
        <img src="/logo.png" alt="Enzert Logo" className="h-24 w-24 mr-2" />
        {/* <Menu className="w-6 h-6 text-white" /> */}
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
