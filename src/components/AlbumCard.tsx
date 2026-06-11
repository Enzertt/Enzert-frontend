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
    <div className="rounded-xl overflow-hidden shadow-lg bg-[#1a1a1a]/20 hover:scale-105 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-300 ease-out p-6">
      <img
        src="https://strut-records.co.uk/cdn/shop/files/STRUT482_STRUT482D_Artwork_1.jpg?v=1751626059"
        alt={album.title}
        className="w-full h-60 object-cover"
      />

      <div className="py-4">
        <h3 className="text-xl font-bold text-[#D4C3BC]">{album.title}</h3>
        <p className="text-gray-400">{album.artist}</p>

        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span className="">{album.genre}</span>
          <span>{album.year}</span>
        </div>
      </div>
    </div>
  );
}
