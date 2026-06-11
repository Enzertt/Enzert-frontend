export type Album = {
  _id: string;
  title: string;
  artist: string;
  genre?: string;
  coverImage: string;
  year?: number;
  description?: string;
  featured?: boolean;
};
