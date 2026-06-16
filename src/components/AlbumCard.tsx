import Link from "next/link";

type AlbumProps = {
  album: {
    _id: string;
    title: string;
    artist: string;
    genre?: string;
    coverImage: string;
    year?: number;
  };
};

export default function AlbumCard({ album }: AlbumProps) {
  return (
    <Link href={`/albums/${album._id}`}>
      <div className="rounded-xl overflow-hidden shadow-lg bg-[#1a1a1a]/20 hover:bg-[#46291B]/20 hover:scale-102 hover:-translate-y-2 transition-all duration-300 ease-out px-4 py-2 cursor-pointer">
        <img
          src={album.coverImage}
          alt={album.title}
          className="w-full h-40 object-cover rounded-sm"
        />

        <div className="py-4">
          <h3 className="text-md text-[#D4C3BC]">{album.title}</h3>
          <p className="text-sm text-gray-400">{album.artist}</p>

          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{album.genre}</span>
            <span>{album.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
