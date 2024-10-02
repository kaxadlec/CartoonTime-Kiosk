// src/renderer/types/cartoon.ts

// export interface Cartoon {
//   id: number;
//   title: string;
//   author: string;
//   genre: string;
//   imageUrl: string;
//   section: string;
// }

export interface Genre {
  id: number;
  genreNameEn: string;
  genreNameKo: string;
}

export interface Cartoon {
  id: number;
  titleEn: string;
  titleKo: string;
  authorEn: string;
  authorKo: string;
  location: string;
  imageUrl: string;
  genres: Genre[];
}
