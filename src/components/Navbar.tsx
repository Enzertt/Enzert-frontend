"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4
      bg-black/20 backdrop-blur-md border-b border-white/10 text-white"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img src="/logo.png" alt="Enzert Logo" className="h-14 w-14" />
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
