import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "./slice";

export default configureStore({
  reducer: {
    restaurants: restaurantsReducer,
  },
});
