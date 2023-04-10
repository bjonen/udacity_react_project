// We just name the default export "middleware" and import it as middleware.
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/questions/questionSlice.js";
import { authedUserSlice } from "../features/users/authedUserSlice";

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
});
