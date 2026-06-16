"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-[#110D0C]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#110D0C]/75" />

      {/* Instruments Background */}
      <div className="absolute inset-0">
        <img
          src="/instruments/krarf.png"
          alt=""
          className="absolute w-80 opacity-25 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 zoom-pulse"
        />

        <img
          src="/instruments/kebero.png"
          alt=""
          className="absolute w-56 opacity-20 left-[20%] top-[25%] -rotate-12 zoom-pulse"
        />

        <img
          src="/instruments/masenqo.png"
          alt=""
          className="absolute w-48 opacity-20 right-[25%] top-[20%] rotate-12 zoom-pulse "
        />

        <img
          src="/instruments/masenqo2.png"
          alt=""
          className="absolute w-40 opacity-50 left-[40%] bottom-[0%] -rotate-45 zoom-pulse"
        />

        <img
          src="/instruments/guitar.png"
          alt=""
          className="absolute w-52 opacity-20 right-[15%] bottom-[20%] rotate-12 zoom-pulse"
        />

        <img
          src="/instruments/saxaphone.png"
          alt=""
          className="absolute w-36 opacity-45 left-[60%] top-[42%] zoom-pulse"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="text-[#D4C3BC] text-6xl  font-medium tracking-[0.2em]">
          እንዝርት
        </h1>

        <p className="mt-4 text-[#D4C3BC]/70 max-w-xl text-lg md:text-xl">
          Discover Ethiopian Amharic music, artists, albums, and timeless
          cultural sounds in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-[#46291B] text-[#110D0C] rounded-full font-medium hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            href="/explore"
            className="px-6 py-3 border border-white/30 text-[#D4C3BC] rounded-full backdrop-blur-sm hover:bg-[#46291B]/30 transition"
          >
            Explore Music
          </Link>
        </div>
      </div>
    </section>
  );
}
