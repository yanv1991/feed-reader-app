import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import DeleteFeed from "./DeleteFeed";

describe("<AddFeed />", () => {
  let getByTestId;

  afterEach(cleanup);

  describe("clicking the delete button", () => {
    let sendHandler;

    beforeEach(() => {
      sendHandler = jest.fn();
      ({ getByTestId } = render(<DeleteFeed id={'test'} idx={0} onDeleteFeed={sendHandler} />));

      fireEvent.click(getByTestId("delete-0"));
    });

    it("opens confirmation message", () => {
      expect(getByTestId("confirmation-message").textContent).toEqual("Are you sure you want to delete this item?");
    });
  });
});
