import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie";
import { resetRegistration } from "./registerSlice";
import { CiLogout } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    isLoggedIn: !!Cookies.get("token"),
}

const logoutIcon = <CiLogout />;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            toast.info("You Logged Out", {
                icon: logoutIcon
            });
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