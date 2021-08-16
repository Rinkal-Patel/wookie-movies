import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";

import {
  moviewsActions,
  selectIsFavoriteMovie,
  useAppSelector,
} from "../../data";

type HeaderControlsProps = {
  id: string;
  inverse?: boolean;
  withFavoriteButton?: boolean;
  withBackButton?: boolean;
};

const styles = StyleSheet.create({
  navigationContainer: {
    position: "absolute",
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 8,
  },
  favoriteButton: {
    paddingHorizontal: 16,
  },
});

export const HeaderControls = memo(
  ({
    id,
    inverse,
    withFavoriteButton = true,
    withBackButton = true,
  }: HeaderControlsProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const safeAreaInsets = useSafeAreaInsets();
    const safeAreaStyle = useMemo(
      () => ({ flex: 1, paddingTop: safeAreaInsets.top }),
      [safeAreaInsets]
    );

    const isFavorite = useAppSelector((state) =>
      selectIsFavoriteMovie(state, id)
    );

    const handleToggleFavoriteMoview = useCallback(() => {
      dispatch(moviewsActions.toggleFavoriteMovieAction(id));
    }, [dispatch, id]);

    const defaultColor = inverse ? "black" : "white";

    return (
      <View style={[styles.navigationContainer, safeAreaStyle]}>
        {withBackButton ? (
          <HeaderBackButton
            tintColor={defaultColor}
            onPress={navigation.goBack}
          />
        ) : (
          <View />
        )}
        {withFavoriteButton ? (
          <TouchableOpacity
            style={styles.favoriteButton}
            testID={isFavorite ? "favorite" : "favorite-outline"}
            onPress={handleToggleFavoriteMoview}
          >
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-outline"}
              size={24}
              color={isFavorite ? "orange" : defaultColor}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
);
