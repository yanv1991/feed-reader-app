export const initialState = {
  feeds: [],
  fetched: false,
  skip: 0
};

export default function feed(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_FEEDS":
      return { ...state, isFetching: true };
    case "ADD_FEEDS_SUCESS":
      return { ...state, feeds: state.feeds.concat(action.payload), showSuccess: true, hasError: false };
    case "ADD_FEEDS_ERROR":
      return { ...state, hasError: true, showSuccess: true };
    case "RECEIVE_FEEDS":
      return {
          ...state,
          feeds: [...state.feeds, ...action.payload],
          fetched: true,
          hasMoreItems: Boolean(action.payload.length),
          skip: [...state.feeds, ...action.payload].length
        };
    case "HIDE_CLOSE":
      return { ...state, showSuccess: false }
    default:
      return state;
  }
}
