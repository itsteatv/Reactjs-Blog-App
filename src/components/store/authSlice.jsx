import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie";
import { resetRegistration } from "./registerSlice";

const initialState = {
    isLoggedIn: !!Cookies.get("token"),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
})

export const clearTokenCookie = () => {
    Cookies.remove("token");
};

export const logoutAndResetRegistration = () => (dispatch) => {
    dispatch(logout());
    dispatch(resetRegistration());
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer