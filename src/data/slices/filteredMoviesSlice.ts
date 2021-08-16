import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { fetchMovies, Movie } from "../../api";
import { LoadingState } from "../types";

export const searchMoviesAsyncAction = createAsyncThunk(
  "filteredMovies/searchMoviesAsyncAction",
  async (searchTerm: string) => {
    const response = await fetchMovies({ search: searchTerm });
    return response;
  }
);

const filteredMoviesAdapter = createEntityAdapter<Movie>();

// redux toolkit uses immer inside which guarantees state immutability
export const filteredMoviesSlice = createSlice({
  name: "filteredMovies",
  initialState: filteredMoviesAdapter.getInitialState({
    loadingState: LoadingState.unset,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchMoviesAsyncAction.pending, (state) => {
      state.loadingState = LoadingState.loading;
    });
    builder.addCase(searchMoviesAsyncAction.fulfilled, (state, action) => {
      filteredMoviesAdapter.setAll(state, action.payload.movies);
      state.loadingState = LoadingState.loaded;
    });
    builder.addCase(searchMoviesAsyncAction.rejected, (state) => {
      state.loadingState = LoadingState.failed;
    });
  },
});

// part of global that, used for selectors
type State = {
  filteredMovies: ReturnType<typeof filteredMoviesSlice.reducer>;
};

const filteredMoviesSelectors = filteredMoviesAdapter.getSelectors<State>(
  (state) => state.filteredMovies
);

export const selectFilteredMoviesIds = filteredMoviesSelectors.selectIds as (
  state: State
) => string[];

export const selectFilteredMoviesLoadingState = (state: State) =>
  state.filteredMovies.loadingState;
