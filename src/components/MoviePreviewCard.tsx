import React, { memo, useCallback, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  selectIsFavoriteMovie,
  selectMovieById,
  useAppSelector,
} from "../data";
import { Routes } from "../navigation/routes";

type MoviePreviewCardProps = {
  id: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  favoriteContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: 8,
    right: 8,
  },
});

export const MoviePreviewCard = memo(({ id }: MoviePreviewCardProps) => {
  const navigation = useNavigation();
  const movieData = useAppSelector((state) => selectMovieById(state, id));
  const isFavorite = useAppSelector((state) =>
    selectIsFavoriteMovie(state, id)
  );

  const handlePress = useCallback(() => {
    navigation.navigate(Routes.MovieDetails, { id });
  }, [navigation, id]);

  const source = useMemo(
    () => ({
      uri: movieData?.poster,
    }),
    [movieData?.poster]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      testID={movieData?.title}
      onPress={handlePress}
    >
      <Image style={styles.poster} source={source} />
      <View style={styles.favoriteContainer}>
        {isFavorite ? (
          <MaterialIcons name="favorite" size={24} color="orange" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
});
