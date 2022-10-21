import { createSlice } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";

const filteredSlice = createSlice({
  name: "filtered",
  initialState: { filteredOffers: [] },
  reducers: {
    addfilteredoffer(state, action) {
      const Offer = action.payload;
      state.filteredOffers = Offer;
    },
    loadingBar: loadingBarReducer,
  },
});
export const filteredActions = filteredSlice.actions;
export default filteredSlice;
