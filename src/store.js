import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const configureStore = preloadedState => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
