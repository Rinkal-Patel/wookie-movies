import React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { StatusBar } from "expo-status-bar";

import { createStore } from "../data";
import { AppNavigator } from "../navigation";
import mockedMovies from "./mockedMovies.json";

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const renderApp = () =>
  render(
    <Provider store={createStore()}>
      <IntlProvider locale="en">
        <AppNavigator />
        <StatusBar />
      </IntlProvider>
    </Provider>
  );

const savedFetch = global.fetch;

// TODO use msw for mocking
const mockFetch = (path: string, response: object) => {
  global.fetch = jest.fn().mockImplementation((url: string) => {
    if (url.includes(path)) {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ json: () => Promise.resolve(response) }), 50)
      );
    }

    return savedFetch(url);
  });
};

// TODO we use testId in tests - but instead we should use findByText - sadly, this feature in broken in current version of testing-library

describe("Movies app", () => {
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    global.fetch = savedFetch;
  });

  it(`renders correctly`, async () => {
    const { findByTestId } = renderApp();
    const homeScreen = await findByTestId("HomeScreen");

    expect(homeScreen).toBeTruthy();
  });

  it(`renders empty home page`, async () => {
    mockFetch("/movies", { movies: [] });

    const { findByTestId } = renderApp();
    const loadingBox = await findByTestId("loading-box");

    expect(loadingBox).toBeTruthy();

    const emptyBox = await findByTestId("empty-box");

    expect(emptyBox).toBeTruthy();
  });

  it(`renders home page with movies`, async () => {
    mockFetch("/movies", mockedMovies);

    const { queryByTestId, findAllByTestId } = renderApp();

    await waitFor(() => expect(queryByTestId("loading-box")).toBeTruthy());
    await waitFor(() => expect(queryByTestId("loading-box")).toBeFalsy());
    const movies = await findAllByTestId("The Dark Knight");

    expect(movies.length).toBe(3);
  });

  it(`opens movie details`, async () => {
    mockFetch("/movies", mockedMovies);

    const { findAllByTestId, findByTestId } = renderApp();

    const movies = await findAllByTestId("The Dark Knight");

    fireEvent.press(movies[0]);

    const detailsPage = await findByTestId(
      "MovieDetailsScreen-The Dark Knight"
    );

    expect(detailsPage).toBeTruthy();
  });

  it(`opens movie details and marks favorite`, async () => {
    mockFetch("/movies", mockedMovies);

    const { findAllByTestId, queryByTestId, findByTestId } = renderApp();

    const movies = await findAllByTestId("The Dark Knight");

    fireEvent.press(movies[0]);

    await findByTestId("MovieDetailsScreen-The Dark Knight");
    const inactiveFavoriteButton = await findByTestId("favorite-outline");
    fireEvent.press(inactiveFavoriteButton);

    expect(queryByTestId("favorite-outline")).toBeFalsy();
    expect(await findByTestId("favorite")).toBeTruthy();
  });
});
