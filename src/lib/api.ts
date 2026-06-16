import { Album } from "@/types/album";

export async function getAlbums(): Promise<Album[]> {
  const res = await fetch("http://localhost:5000/api/albums");

  const data = await res.json();

  // 👇 SAFE CHECK (IMPORTANT)
  if (!Array.isArray(data)) {
    console.error("API did not return array:", data);
    return [];
  }

  return data;
}
