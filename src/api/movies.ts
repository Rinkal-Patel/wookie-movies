import { API_KEY, API_URL } from "../constants";

export type Movie = {
  backdrop?: string;
  cast?: string[];
  classification?: string;
  director?: string;
  genres?: string[];
  id: string;
  imdb_rating?: number;
  length?: string;
  overview?: string;
  poster?: string;
  released_on?: string;
  slug?: string;
  title?: string;
};

export const fetchMovies = async ({
  search,
}: { search?: string } = {}): Promise<{ movies: Movie[] }> => {
  if (!API_KEY) {
    throw new Error("Missed API_KEY");
  }

  const queryString = search || search === "" ? `?q=${search}` : "";

  const res = await fetch(`${API_URL}/movies${queryString}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const json = await res.json();

  return json;
};
