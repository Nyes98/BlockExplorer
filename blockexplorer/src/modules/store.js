import { configureStore } from "@reduxjs/toolkit";
import { buttonreducer } from "./button";

const store = configureStore({
  reducer: {
    button: buttonreducer,
  },
});

export default store;
