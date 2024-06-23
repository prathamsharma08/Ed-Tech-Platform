import { createSlice } from "@reduxjs/toolkit";
import { Toast} from "react-hot-toast";
const initialState = {
  totalItems:localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")):0
  
};

const cartSlice = createSlice({
  name:"cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, value) {
      state.user = value.payload;
    },
  },
});

export const { setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;
