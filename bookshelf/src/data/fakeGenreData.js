export const genres = [
  { _id: "g1", name: "Fantasy" },
  { _id: "g2", name: "Romance" },
  { _id: "g3", name: "Thriller" },
  { _id: "g4", name: "Horror" },
  { _id: "g5", name: "Adventure" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
