import { Album } from "@/types/album";

export async function getAlbums(): Promise<Album[]> {
  const res = await fetch("http://localhost:5000/api/albums");

  const data = await res.json();

  return data;
}
