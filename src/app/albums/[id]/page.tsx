import AlbumPlayer from "@/components/AlbumPlayer";

async function getAlbum(id: string) {
  const res = await fetch(`http://localhost:5000/api/albums/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const album = await getAlbum(id);

  if (!album) {
    return <div>Album not found</div>;
  }

  return <AlbumPlayer album={album} />;
}
