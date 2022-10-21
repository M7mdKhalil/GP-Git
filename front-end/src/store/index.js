import { configureStore } from "@reduxjs/toolkit";
import filteredSlice from "./filteredSlice";
import loadingBarReducer from "react-redux-loading-bar";

const store = configureStore({
  reducer: { filtered: filteredSlice.reducer},
});

export default store;
