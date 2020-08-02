import { GenreM } from "./GenreM";

interface GameM {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  price: number;
  pgRating: string;
  image: string;
  genre: GenreM;
}

export default GameM;
