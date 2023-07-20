import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    isRegistered: !!Cookies.get("token"),
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        register(state) {
            state.isRegistered = true;
        },
        resetRegistration(state) {
            state.isRegistered = false;
        },
    },
});

export const clearTokenCookie = () => {
    Cookies.remove("token");
};


export const { register, resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;