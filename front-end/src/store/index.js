import { configureStore } from "@reduxjs/toolkit";
import filteredSlice from "./filteredSlice";
import appliersSlice from "./appliersSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: { filtered: filteredSlice.reducer, user: userSlice.reducer },
});

export default store;
