import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

const configureStore = preloadedState => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(...[thunk])
  );

  return store;
};

export default configureStore;
