import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { Platform, StyleSheet, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { EmptyState } from "../components/EmptyState";
import { LoadingStateView } from "../components/LoadingStateView";
import { MoviePreviewCard } from "../components/MoviePreviewCard";
import { Title } from "../components/Title";
import {
  LoadingState,
  searchMoviesAsyncAction,
  selectFilteredMoviesIds,
  selectFilteredMoviesLoadingState,
  useAppSelector,
} from "../data";

const messages = defineMessages({
  title: {
    id: "SearchScreen.title",
    defaultMessage: "Search",
  },
  searchPlaceholder: {
    id: "SearchScreen.searchPlaceholder",
    defaultMessage: "Movie name",
  },
  empty: {
    id: "SearchScreen.empty",
    defaultMessage: "Nothing found",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  autocomplete: {
    position: "relative",
    width: "100%",
    marginTop: 16,
  },
  searchIcon: {
    position: "absolute",
    zIndex: 1,
    // TODO fix small platform trick
    top: Platform.select({ ios: 10, android: 14 }),
    left: 12,
  },
  searchInput: {
    paddingVertical: 12,
    paddingLeft: 40,
    backgroundColor: "#f4f4f4",
    borderRadius: 6,
  },
  autocompleteList: {
    paddingTop: 16,
  },
  autocompleteListContainer: {
    alignItems: "center",
    paddingBottom: 32,
  },
  movieCard: {
    marginBottom: 16,
    width: 200,
    height: 300,
  },
});

const keyExtractor = (id: string) => id;

const renderMovieItem = ({ item }: { item: string }) => (
  <View style={styles.movieCard}>
    <MoviePreviewCard id={item} />
  </View>
);

export const SearchScreen = memo(() => {
  const safeAreaInsets = useSafeAreaInsets();
  const safeAreaStyle = useMemo(
    () => ({ flex: 1, paddingTop: safeAreaInsets.top }),
    [safeAreaInsets]
  );
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput & { focus: () => void }>(null);
  const filteredMoviesIds = useAppSelector(selectFilteredMoviesIds);
  const loadingState = useAppSelector(selectFilteredMoviesLoadingState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dispatch(searchMoviesAsyncAction(search));
  }, [dispatch, search]);

  return (
    <View style={[styles.container, safeAreaStyle]}>
      <Title>{intl.formatMessage(messages.title)}</Title>
      <View style={styles.autocomplete}>
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          placeholder={intl.formatMessage(messages.searchPlaceholder)}
          style={styles.searchInput}
          value={search}
          placeholderTextColor="gray"
          onChangeText={setSearch}
        />
      </View>
      <LoadingStateView
        isEmpty={
          loadingState === LoadingState.loaded && !filteredMoviesIds.length
        }
        emptyComponent={
          <EmptyState title={<FormattedMessage {...messages.empty} />} />
        }
        loadingState={loadingState}
      >
        <FlatList
          style={styles.autocompleteList}
          contentContainerStyle={styles.autocompleteListContainer}
          data={filteredMoviesIds}
          keyExtractor={keyExtractor}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
        />
      </LoadingStateView>
    </View>
  );
});
