import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { getAlbums } from "@/lib/api";
import { Album } from "@/types/album";
import AlbumCard from "@/components/AlbumCard";
import AlbumCarousel from "@/components/AlbumCarousel";
export default async function Page() {
  const albums = await getAlbums();

  return (
    <>
      <Navbar />
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between ">
          {" "}
          <h2 className="text-yxl font-bold mb-8 text-[#D4C3BC]">
            Trending Collections
          </h2>
          <p className="text-[#46291B] cursor-pointer">View Archive</p>
        </div>

        <AlbumCarousel albums={albums} />
      </section>
    </>
  );
}
