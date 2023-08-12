import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allPosts: [],
    selectedPost: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.allPosts = action.payload;
        },
        setSelectedPost(state, action) {
            state.selectedPost = action.payload;
        },
    },
});

export const { setPosts, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
