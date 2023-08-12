import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import registerSlice from "./registerSlice";
import userSlice from "./userSlice";
import PostsSlice from "./PostsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        user: userSlice,
        posts: PostsSlice,
    }
})

export default store;