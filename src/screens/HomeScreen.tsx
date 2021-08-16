import React, { memo, useEffect, useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { EmptyState } from "../components/EmptyState";
import { LoadingStateView } from "../components/LoadingStateView";
import { MoviePreviewCard } from "../components/MoviePreviewCard";
import { Title } from "../components/Title";
import {
  fetchMoviesAsyncAction,
  LoadingState,
  selectMoviesIdsByGenre,
  selectMoviesLoadingState,
  useAppSelector,
} from "../data";

const messages = defineMessages({
  empty: {
    id: "Home.empty",
    defaultMessage: "Nothing to show",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionList: {
    marginTop: 12,
    paddingBottom: 32,
  },
  sectionTitle: {
    marginLeft: 24,
  },
  movieCard: {
    marginRight: 8,
    width: 120,
    height: 180,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 12,
  },
  firstMovie: {
    marginLeft: 24,
  },
  lastMovie: {
    marginRight: 24,
  },
});

type Section = {
  title: string;
  data: string[];
};

const keyExtractor = (id: string) => id;

const renderGenreItem = ({ item, index }: { item: string; index: number }) => (
  <View style={[styles.movieCard, index === 0 ? styles.firstMovie : {}]}>
    <MoviePreviewCard id={item} />
  </View>
);

const renderGenre = ({ item }: { item: Section }) => (
  <>
    <View style={styles.sectionTitle}>
      <Title>{item.title}</Title>
    </View>
    <FlatList
      contentContainerStyle={styles.sectionList}
      horizontal
      data={item.data}
      keyExtractor={keyExtractor}
      renderItem={renderGenreItem}
      showsHorizontalScrollIndicator={false}
    />
  </>
);

const ListHeaderComponent = () => {
  const title = `WOOKIE\n MOVIES`;

  return (
    <View style={styles.titleContainer}>
      <Title size="large" textAlign="center">
        {title}
      </Title>
    </View>
  );
};

const genresKeyExtractor = (item: { title: string }) => item.title;

export const HomeScreen = memo(() => {
  const safeAreaInsets = useSafeAreaInsets();
  const safeAreaStyle = useMemo(
    () => ({ flex: 1, paddingTop: safeAreaInsets.top }),
    [safeAreaInsets]
  );
  const dispatch = useDispatch();
  const loadingState = useSelector(selectMoviesLoadingState);
  const moviesIdsByGenres = useAppSelector(selectMoviesIdsByGenre);

  useEffect(() => {
    dispatch(fetchMoviesAsyncAction());
  }, [dispatch]);

  return (
    <View style={[styles.container, safeAreaStyle]} testID="HomeScreen">
      <LoadingStateView
        loadingState={loadingState}
        isEmpty={
          loadingState === LoadingState.loaded && !moviesIdsByGenres.length
        }
        emptyComponent={
          <EmptyState title={<FormattedMessage {...messages.empty} />} />
        }
      >
        <FlatList<any>
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.sectionList}
          data={moviesIdsByGenres}
          keyExtractor={genresKeyExtractor}
          renderItem={renderGenre}
          showsVerticalScrollIndicator={false}
        />
      </LoadingStateView>
    </View>
  );
});
