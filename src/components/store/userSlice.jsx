import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, { getState }) => {
    const authHeader = `Bearer ${Cookies.get('token')}`;
    const response = await fetch('https://neisiali.ir/api/user', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authHeader,
        },
    });

    const responseData = await response.json();

    if (!response.ok || !responseData || !responseData.message) {
        throw new Error('Failed to fetch user data.');
    }

    return responseData.message;
});

const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export { fetchUserData };
export default userSlice.reducer;
