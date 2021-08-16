import React, { ReactNode } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { LoadingState } from "../data";
import { Title } from "./Title";

const messages = defineMessages({
  generalErrorMessage: {
    id: "LoadingState.failed",
    defaultMessage: "Something went wrong, please try again or restart the app",
  },
});

type LoadingStateViewProps = {
  children: ReactNode;
  loadingState: LoadingState;
  isEmpty?: boolean;
  emptyComponent?: ReactNode;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
  },
});

export const LoadingStateView = ({
  isEmpty,
  loadingState,
  children,
  emptyComponent,
}: LoadingStateViewProps) => {
  if (
    loadingState === LoadingState.loading ||
    loadingState === LoadingState.unset
  ) {
    return (
      <View style={styles.container} testID="loading-box">
        <ActivityIndicator />
      </View>
    );
  }

  if (loadingState === LoadingState.failed) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="error-outline" color="red" size={32} />
        <Title size="small" textAlign="center">
          <FormattedMessage {...messages.generalErrorMessage} />
        </Title>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.container} testID="empty-box">
        {emptyComponent}
      </View>
    );
  }

  return <>{children}</>;
};
