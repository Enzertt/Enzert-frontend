import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Login from "@/components/Login";
export const metadata: Metadata = {
  title: "Enzert Music",
  description: "Your personal music experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#110D0C] text-white">
        {/* <Navbar /> */}

        {children}
      </body>
    </html>
  );
}
