import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";
import { Auth } from "./types";

const initialState: Auth = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    signOut(state) {
      state.token = null;
    },
  },
});

export const { getUserData, signOut } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default authSlice.reducer;
