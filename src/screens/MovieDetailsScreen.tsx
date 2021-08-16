import React, { memo, useMemo } from "react";
import { defineMessage, FormattedMessage } from "react-intl";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useCollapsibleHeader } from "react-navigation-collapsible";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";

import { LoadingStateView } from "../components/LoadingStateView";
import { MovieDetailsHeader } from "../components/MovieDetailsHeader";
import {
  selectMovieById,
  selectMoviesLoadingState,
  useAppSelector,
} from "../data";
import { MovieDetailsRouteProp } from "../navigation/routes";

const messages = defineMessage({
  movieInfo: {
    id: "MoviewDetailsScreen.movieInfo",
    defaultMessage: "{year} | {duration} | {director}",
  },
  cast: {
    id: "MoviewDetailsScreen.cast",
    defaultMessage: "Cast: {value}",
  },
  moviewDescription: {
    id: "MoviewDetailsScreen.moviewDescription",
    defaultMessage: "Movie description: {value}",
  },
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "white",
    height: "100%",
  },
  content: {
    height: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 24,
    marginBottom: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    marginTop: 16,
  },
});

const getHeaderConfig = () => ({
  navigationOptions: {
    header: ({ previous }: StackHeaderProps) => (
      <MovieDetailsHeader previous={Boolean(previous)} />
    ),
  },
  config: { useNativeDriver: true },
});

export const MovieDetailsScreen = memo(() => {
  const route = useRoute<MovieDetailsRouteProp>();
  const { id } = route.params;
  const movieData = useAppSelector((state) => selectMovieById(state, id));
  const headerConfig = useMemo(() => getHeaderConfig(), []);
  const loadingState = useSelector(selectMoviesLoadingState);

  const {
    containerPaddingTop,
    scrollIndicatorInsetTop,
    onScroll,
  } = useCollapsibleHeader(headerConfig);

  const contentContainerStyle = useMemo(
    () => [styles.content, { paddingTop: containerPaddingTop }],
    [containerPaddingTop]
  );

  const scrollIndicatorInsets = useMemo(
    () => ({ top: scrollIndicatorInsetTop }),
    [scrollIndicatorInsetTop]
  );

  const year = movieData?.released_on
    ? new Date(movieData.released_on).getFullYear()
    : "???";

  return (
    <View
      style={styles.container}
      testID={`MovieDetailsScreen-${movieData?.title}`}
    >
      <LoadingStateView loadingState={loadingState}>
        <Animated.ScrollView
          contentContainerStyle={contentContainerStyle}
          scrollIndicatorInsets={scrollIndicatorInsets}
          onScroll={onScroll}
        >
          <Text>
            <FormattedMessage
              {...messages.movieInfo}
              values={{
                year,
                duration: movieData?.length,
                director: movieData?.director,
              }}
            />
          </Text>
          <Text style={styles.item}>
            <FormattedMessage
              {...messages.cast}
              values={{ value: movieData?.cast?.join(", ") }}
            />
          </Text>
          <Text style={styles.item}>
            <FormattedMessage
              {...messages.moviewDescription}
              values={{ value: movieData?.overview }}
            />
          </Text>
        </Animated.ScrollView>
      </LoadingStateView>
    </View>
  );
});
