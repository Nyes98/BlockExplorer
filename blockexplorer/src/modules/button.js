import { createSlice } from "@reduxjs/toolkit";

let initialState = { value: false };

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    openMordal(state) {
      state.value = true;
    },
    closeMordal(state) {
      state.value = false;
    },
  },
});

export const buttonreducer = buttonSlice.reducer;

export const action = buttonSlice.actions;
