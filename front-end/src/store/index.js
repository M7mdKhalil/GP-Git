import { configureStore } from "@reduxjs/toolkit";
import filteredSlice from "./filteredSlice";
import appliersSlice from "./appliersSlice";
import loadingBarReducer from "react-redux-loading-bar";

const store = configureStore({
  reducer: { filtered: filteredSlice.reducer,appliers:appliersSlice.reducer},
});

export default store;