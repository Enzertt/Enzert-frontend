type Props = {
  params: {
    id: string;
  };
};

async function getAlbum(id: string) {
  const res = await fetch(`http://localhost:5000/api/albums/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function AlbumPage({ params }: Props) {
  const { id } = await params;

  const album = await getAlbum(id);

  if (!album) {
    return (
      <div className="min-h-screen bg-[#110D0C] text-white flex items-center justify-center">
        Album not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#110D0C] text-white relative">
      {/* HERO BACKGROUND (Spotify vibe) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#46291B]/40 via-[#110D0C] to-[#110D0C]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-10 items-end">
          {/* COVER */}
          <div className="shrink-0">
            <img
              src={album.coverImage}
              alt={album.title}
              className="w-[280px] h-[280px] object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* INFO */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Album
            </p>

            <h1 className="text-5xl font-extrabold">{album.title}</h1>

            <p className="text-xl text-gray-300">{album.artist}</p>

            {/* META ROW */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {album.genre && <span>{album.genre}</span>}
              {album.year && <span>{album.year}</span>}
            </div>

            {/* DESCRIPTION */}
            <p className="text-[#D4C3BC] max-w-xl leading-relaxed">
              {album.description || "No description available."}
            </p>

            {/* PLAY BUTTON (UI only for now) */}
            <button className="mt-4 bg-[#A04100] px-6 py-3 rounded-full hover:scale-105 transition">
              ▶ Play
            </button>
          </div>
        </div>

        {/* TRACK SECTION */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Tracks</h2>

          {album.tracks && album.tracks.length > 0 ? (
            <div className="space-y-2">
              {album.tracks.map((track: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-3 rounded-lg bg-[#1a1a1a]/30 hover:bg-[#46291B]/20 transition"
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-gray-500">{index + 1}</span>
                    <span>{track.title}</span>
                  </div>

                  <span className="text-gray-400 text-sm">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No tracks yet — add them from admin panel.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
