import { createSlice } from "@reduxjs/toolkit";

export const authedUserSlice = createSlice({
  name: "authedUser",
  initialState: {
    id: "anonymous",
  },
  reducers: {
    login(state, action) {
      state.id = action.payload;
    },
    // In case we want to add more sophisticated auth later
    logout(state, action) {
      state.id = null;
    },
  },
});

export const { login, logout } = authedUserSlice.actions;
