"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AlbumCard from "./AlbumCard";
import { Album } from "@/types/album";

type Props = {
  albums: Album[];
};

export default function AlbumCarousel({ albums }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* fade left */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />

      {/* fade right */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />

      {/* left button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-[#46291B] p-3 rounded-full"
      >
        <ChevronLeft />
      </button>

      {/* scroll area */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-12 scrollbar-hide snap-x snap-mandatory"
      >
        {albums.map((album) => (
          <div
            key={album._id}
            className="min-w-[280px] flex-shrink-0 snap-start"
          >
            <AlbumCard album={album} />
          </div>
        ))}
      </div>

      {/* right button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-[#46291B] p-3 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
