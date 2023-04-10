import { createSlice } from "@reduxjs/toolkit";

export const authedUserSlice = createSlice({
  name: "authedUser",
  initialState: {
    id: "sarahedo",
  },
  reducers: {
    login(state, action) {
      state.id = action.payload;
    },
    logout(state, action) {
      state.id = null;
    },
  },
});

export const { login, logout } = authedUserSlice.actions;

// authedUserSlice.reducer;
