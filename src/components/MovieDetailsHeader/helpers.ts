export const generateRatingStars = (rating?: number) => {
  const stars: ("star" | "star-o" | "star-half-empty")[] = [
    "star-o",
    "star-o",
    "star-o",
    "star-o",
    "star-o",
  ];
  const normalizedRating = rating ? rating / 2 : 0;

  for (let i = 0; i < Math.floor(normalizedRating); i++) {
    stars[i] = "star";
  }

  if (normalizedRating - Math.floor(normalizedRating) > 0) {
    stars[Math.floor(normalizedRating)] = "star-half-empty";
  }

  return stars.map((name, index) => ({ name, id: index }));
};
