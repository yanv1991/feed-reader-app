import React from "react";
import { render, cleanup } from "@testing-library/react";

import { FeedList } from "./FeedList";

import MOCK from "../mock";

const URL = "https://www.reddit.com/.rss";

describe("<FeedList />", () => {
  let getAllByRole;
  let getByRole;

  afterEach(cleanup);

  describe("show items or loading message", () => {
    it("should count items", () => {
      ({ getAllByRole } = render(<FeedList feeds={MOCK} fetched={true} />));
      expect(getAllByRole("item").length).toBe(1);
    });

    it("should show loading", () => {
        ({ getByRole } = render(<FeedList feeds={[]} isFetching={true} />));
        
        expect(getByRole("loading").textContent).toEqual("Loading...");
      });
  });
});
