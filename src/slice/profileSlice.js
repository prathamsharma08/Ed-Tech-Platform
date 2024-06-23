import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  
};

const profileSlice = createSlice({
  name:"profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    // add to cart
    // remove from cart
    // resetCart
  },
});

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
