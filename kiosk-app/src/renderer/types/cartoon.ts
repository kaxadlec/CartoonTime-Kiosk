// src/renderer/types/cartoon.ts

export interface Genre {
  id: number;
  genreNameKo: string;
}

export interface Cartoon {
  id: number;
  title: string;
  author: string;
  location: string;
  imageUrl: string;
  genres: Genre[];
}
