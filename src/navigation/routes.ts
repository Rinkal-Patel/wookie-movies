import { RouteProp } from "@react-navigation/native";

export enum Routes {
  Root = "Root",
  Home = "Home",
  Search = "Search",
  MovieDetails = "MovieDetails",
}

export type HomeStackParamList = {
  [Routes.Home]: undefined;
  [Routes.MovieDetails]: { id: string };
};

export type MovieDetailsRouteProp = RouteProp<
  HomeStackParamList,
  Routes.MovieDetails
>;
