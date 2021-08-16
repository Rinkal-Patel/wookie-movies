import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { fetchMovies, Movie } from "../../api";
import { LoadingState } from "../types";

export const fetchMoviesAsyncAction = createAsyncThunk(
  "movies/fetchMoviesAsyncAction",
  async () => {
    const response = await fetchMovies();
    return response;
  }
);

const moviesAdapter = createEntityAdapter<Movie>();

// redux toolkit uses immer inside which guarantees state immutability
export const moviesSlice = createSlice({
  name: "movies",
  initialState: moviesAdapter.getInitialState({
    loadingState: LoadingState.unset,
    favoriteMovies: {} as { [key: string]: boolean },
  }),
  reducers: {
    toggleFavoriteMovieAction: (state, action: PayloadAction<string>) => {
      state.favoriteMovies[action.payload] = !state.favoriteMovies[
        action.payload
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesAsyncAction.pending, (state) => {
      state.loadingState = LoadingState.loading;
    });
    builder.addCase(fetchMoviesAsyncAction.fulfilled, (state, action) => {
      moviesAdapter.setAll(state, action.payload.movies);
      state.loadingState = LoadingState.loaded;
    });
    builder.addCase(fetchMoviesAsyncAction.rejected, (state) => {
      state.loadingState = LoadingState.failed;
    });
  },
});

// part of global that, used for selectors
type State = {
  movies: ReturnType<typeof moviesSlice.reducer>;
};

const moviesSelectors = moviesAdapter.getSelectors<State>(
  (state) => state.movies
);

type Genre = {
  [name: string]: Set<string>;
};

export const moviewsActions = {
  fetchMoviesAsyncAction,
  ...moviesSlice.actions,
};

export const selectMoviesIdsByGenre = createSelector(
  moviesSelectors.selectAll,
  (allMovies) => {
    const moviesIdsByGenre = allMovies.reduce((genres, movie) => {
      // we mutate internal genres object in order to improve performance and readability
      movie.genres?.forEach((genreName) => {
        if (genres[genreName]) {
          genres[genreName].add(movie.id);
        } else {
          genres[genreName] = new Set([movie.id]);
        }

        return genres;
      });

      return genres;
    }, {} as Genre);

    return Object.entries(moviesIdsByGenre).map(([title, ids]) => ({
      title,
      data: Array.from(ids),
    }));
  }
);

export const selectMovieById = moviesSelectors.selectById;

export const selectIsFavoriteMovie = (state: State, id: string) =>
  state.movies.favoriteMovies[id];

export const selectMoviesLoadingState = (state: State) =>
  state.movies.loadingState;
