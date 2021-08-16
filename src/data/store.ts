import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { filteredMoviesSlice } from "./slices/filteredMoviesSlice";
import { moviesSlice } from "./slices/moviesSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      [moviesSlice.name]: moviesSlice.reducer,
      [filteredMoviesSlice.name]: filteredMoviesSlice.reducer,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        process.env.NODE_ENV === "development" ? logger : ([] as any)
      ),
  });

type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
