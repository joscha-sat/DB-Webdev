export interface Movie {
  movie_id?: number;
  duration: number;
  title: string;
  release_year: number;
  fsk: number;
  genre: string;
  image: File | string;
  trailer: string;
  description: string;
}
