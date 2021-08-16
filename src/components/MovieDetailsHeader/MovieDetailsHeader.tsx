import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { selectMovieById, useAppSelector } from "../../data";
import { MovieDetailsRouteProp } from "../../navigation/routes";
import { Title } from "../Title";
import { HeaderControls } from "./HeaderControls";
import { generateRatingStars } from "./helpers";

type MovieDetailsHeaderProps = {
  previous?: boolean;
};

const PREVIEW_IMAGE_WIDTH = 100;
const PREVIEW_IMAGE_HEIGHT = 150;
const BACKDROP_IMAGE_HEIGHT = 180;

const CONTAINER_HEIGHT = BACKDROP_IMAGE_HEIGHT + PREVIEW_IMAGE_HEIGHT * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  posterContainer: {
    left: 24,
    position: "absolute",
  },
  titleContainer: {
    position: "absolute",
    zIndex: 1,
    left: PREVIEW_IMAGE_WIDTH + 32,
    bottom: PREVIEW_IMAGE_HEIGHT * 0.5 + 8,
  },
  rating: {
    position: "absolute",
    zIndex: 1,
    left: PREVIEW_IMAGE_WIDTH + 32,
    bottom: 0,
    flex: 1,
    flexDirection: "row",
  },
  backdropImage: {
    flex: 1,
    maxHeight: BACKDROP_IMAGE_HEIGHT,
  },
  posterImage: {
    width: PREVIEW_IMAGE_WIDTH,
    height: PREVIEW_IMAGE_HEIGHT,
  },
});

export const MovieDetailsHeader = ({ previous }: MovieDetailsHeaderProps) => {
  const route = useRoute<MovieDetailsRouteProp>();
  const { id } = route.params;
  const movieData = useAppSelector((state) => selectMovieById(state, id));
  const safeAreaInsets = useSafeAreaInsets();
  const topInset = safeAreaInsets.top || 0;

  if (!movieData) {
    return (
      <View style={styles.container}>
        <HeaderControls
          id={id}
          inverse
          withBackButton={previous}
          withFavoriteButton={false}
        />
      </View>
    );
  }

  const titleLabel = `${movieData.title} (${movieData.classification})`;

  const containerHeight = CONTAINER_HEIGHT + topInset;
  const backdropImageHeight = BACKDROP_IMAGE_HEIGHT + topInset;
  const movieCardTopOffset =
    BACKDROP_IMAGE_HEIGHT * 0.5 +
    (BACKDROP_IMAGE_HEIGHT - PREVIEW_IMAGE_HEIGHT) * 0.5 +
    topInset;

  return (
    <View style={[styles.container, { minHeight: containerHeight }]}>
      <HeaderControls id={id} withBackButton={previous} />
      <Image
        source={{ uri: movieData?.backdrop }}
        style={[
          styles.backdropImage,
          {
            maxHeight: backdropImageHeight,
          },
        ]}
      />
      <View style={styles.titleContainer}>
        <Title size="small" color="white">
          {titleLabel}
        </Title>
      </View>
      <View style={styles.rating}>
        {generateRatingStars(movieData.imdb_rating).map(
          ({ name, id: starId }) => (
            <FontAwesome key={starId} name={name} size={20} color="orange" />
          )
        )}
      </View>
      <View style={[styles.posterContainer, { top: movieCardTopOffset }]}>
        <Image source={{ uri: movieData?.poster }} style={styles.posterImage} />
      </View>
    </View>
  );
};
