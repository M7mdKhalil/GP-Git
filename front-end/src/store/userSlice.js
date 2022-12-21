import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (obj) => {
    if (obj.userid) {
        const  user  = await axios.get(`http://localhost:5000/user/${obj.userid}`);
        return user.data;
    }

})
const userSlice = createSlice({
  name: "user",
  initialState: {userDetails:{}},
    extraReducers: {
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.userDetails = payload;
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice;
