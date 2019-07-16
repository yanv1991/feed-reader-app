import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { AddFeed } from "./AddFeed";

const URL = 'https://www.reddit.com/.rss'

describe("<AddFeed />", () => {
  let getByTestId;

  afterEach(cleanup);

  describe("clicking the send button", () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<AddFeed onCreateFeed={sendHandler} />));

      fireEvent.change(getByTestId("urlFeed"), {
        target: {
          value: URL
        }
      });

      fireEvent.click(getByTestId("sendButton"));
    });

    it("clears the text field", () => {
      expect(getByTestId("urlFeed").value).toEqual("");
    });

    it("calls the send handler", () => {
      expect(sendHandler).toHaveBeenCalledWith(URL);
    });
  });
});
