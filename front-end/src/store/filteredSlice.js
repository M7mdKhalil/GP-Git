import {createSlice} from '@reduxjs/toolkit'

const filteredSlice = createSlice({
    name:'filtered',
    initialState:{filteredOffers:[]},
    reducers:{
        addfilteredoffer(state,action){
            const Offer = action.payload;
            state.filteredOffers=Offer;
        }
    }
})
export const filteredActions = filteredSlice.actions;
export default filteredSlice;
