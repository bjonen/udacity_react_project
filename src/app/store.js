// We just name the default export "middleware" and import it as middleware.
import middleware from "../middleware";
import { configureStore } from "@reduxjs/toolkit";
import logger from "../middleware/logger.js";
import { apiSlice } from "../apiSlice.js";
import { authedUserSlice } from "../components/authedUserSlice";

const reducer = (state = {}, action) => {
  return state;
};

// https://redux.js.org/tutorials/quick-start#create-a-redux-store
// We use configureStore instead of createStore which is deprecated.
// const store = createStore(reducer, middleware);
// https://redux-toolkit.js.org/api/configureStore
export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authedUserSlice.name]: authedUserSlice.reducer,
  },
  // Will be passed to applyMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  //   preloadedState: {
  //     counter: 1,
  //   },
});
