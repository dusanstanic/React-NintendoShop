import { GenreM } from "./GenreM";
import Console from "./ConsoleM";
import Image from "./ImageM";

interface Game {
  id?: number;
  title: string;
  description: string;
  releaseDate: Date;
  price: number;
  pgRating: string;
  image: string;
  genre: GenreM;
  consoles?: Console[];
  images?: Image[];
}

export default Game;
