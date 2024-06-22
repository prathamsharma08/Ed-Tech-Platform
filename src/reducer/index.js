import { combineReducers } from "@reduxjs/toolkit";
import authReducer from"../slice/authSlice"
const rootReducer=combinedReducers({
    auth:authReducer,
})
export default rootReducer;