import "./types";
import { by, element, expect } from "detox";
import { reloadApp } from "detox-expo-helpers";

describe("Critical user path", () => {
  it("shows bottom navigation", async () => {
    await reloadApp();
    await expect(element(by.text("Home"))).toBeVisible();
    await expect(element(by.text("Search"))).toBeVisible();
  });

  it("shows list of movies", async () => {
    await reloadApp();
    await expect(element(by.text("Action"))).toBeVisible();
    await expect(element(by.text("Crime"))).toBeVisible();
  });

  it("goes to search", async () => {
    await reloadApp();

    element(by.text("Search")).tap();
    await expect(element(by.text("Movie name"))).toBeVisible();

    element(by.type("RCTUITextField")).typeText("ddd");
    await expect(element(by.text("Nothing found"))).toBeVisible();
  });
});
