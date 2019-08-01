import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { DeleteFeed } from "./DeleteFeed";

describe("<AddFeed />", () => {
  let getByTestId;

  afterEach(cleanup);

  describe("clicking the delete button", () => {
    beforeEach(() => {
      ({ getByTestId } = render(<DeleteFeed id={'test'} />));

      fireEvent.click(getByTestId("delete-button"));
    });

    it("clears the text field", () => {
      expect(getByTestId("confirmation-message").value).toEqual("Are you sure you want to remove this item?");
    });

    it("calls the send handler", () => {
      expect(sendHandler).toHaveBeenCalledWith();
    });
  });
});
