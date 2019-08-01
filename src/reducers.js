import {
  REQUEST_FEEDS,
  ADDING_FEED,
  ADD_FEEDS_ERROR,
  ADD_FEEDS_SUCESS,
  RECEIVE_FEEDS,
  HIDE_CLOSE,
  DELETE_FEED_SUCCESS,
} from "./actions";

export const initialState = {
  feeds: [],
  fetched: false,
  skip: 0
};

export default function feed(state = initialState, action) {
  switch (action.type) {
    case ADDING_FEED:
      return { ...state, isAddingItem: true };
    case REQUEST_FEEDS:
      return { ...state, isFetching: true };
    case ADD_FEEDS_SUCESS:
      return {
        ...state,
        feeds: state.feeds.concat(action.payload),
        showSuccess: true,
        hasError: false,
        isAddingItem: false
      };
      case DELETE_FEED_SUCCESS:
        return {
          ...state,
          feeds: state.feeds.filter((item) => item.id !== action.payload.id),
          showSuccess: true,
          hasError: false,
          isAddingItem: false
        };
    case ADD_FEEDS_ERROR:
      return {
        ...state,
        hasError: true,
        showSuccess: true,
        isAddingItem: false,
        isFetching: false,
        fetched: true
      };
    case RECEIVE_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.payload],
        fetched: true,
        hasMoreItems: Boolean(action.payload.length),
        skip: [...state.feeds, ...action.payload].length,
        isFetching: false
      };
    case HIDE_CLOSE:
      return { ...state, showSuccess: false };
    default:
      return state;
  }
}
