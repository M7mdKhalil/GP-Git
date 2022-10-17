import { configureStore } from "@reduxjs/toolkit";
import filteredSlice from "./filteredSlice";

const store =configureStore({
    reducer:{filtered:filteredSlice.reducer}
})

export default store;