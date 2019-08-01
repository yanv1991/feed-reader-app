import reducer from "./reducers";
import * as actions from "./actions";

describe("feeds reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      feeds: [],
      fetched: false,
      skip: 0
    });
  });

  it("should return fetched feeds", () => {
    expect(
      reducer(
        {
          feeds: [],
          fetched: false,
          skip: 0
        },
        {
          type: actions.RECEIVE_FEEDS,
          payload: []
        }
      )
    ).toEqual({ skip: 0, feeds: [], fetched: true, hasMoreItems: false, isFetching: false });
  })

  it("should handle ADD_FEEDS_SUCESS", () => {
    expect(
      reducer(
        { feeds: [], fetched: true, hasMoreItems: false },
        {
          type: actions.ADD_FEEDS_SUCESS,
          payload: { data: "test" }
        }
      )
    ).toEqual({
      hasError: false,
      feeds: [{ data: "test" }],
      fetched: true,
      hasMoreItems: false,
      showSuccess: true,
      isAddingItem: false,
    });
  });

  it("should remove item successfully", () => {
    expect(
      reducer(
        { feeds: [{ data: "test", id: 1 }] },
        {
          type: actions.DELETE_FEED_SUCCESS,
          payload: { id: 1 },
        }
      )
    ).toEqual({
      feeds: [],
      showSuccess: true,
      hasError: false,
      isAddingItem: false
    });
  });
});
