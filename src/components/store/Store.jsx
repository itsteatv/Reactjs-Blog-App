import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import registerSlice from "./registerSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        user: userSlice,
    }
})

export default store;