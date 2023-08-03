import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const initialState = {
    data: null,
    loading: false,
    error: null,
};

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

    console.log(responseData);

    if (!response.ok || !responseData || !responseData.message) {
        throw new Error('Failed to fetch user data.');
    }

    return responseData.data;
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (formData, { rejectWithValue }) => {
    try {
        const authHeader = `Bearer ${Cookies.get('token')}`;

        const response = await fetch('https://neisiali.ir/api/user', {
            method: 'POST',
            headers: {
                Authorization: authHeader,
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            return rejectWithValue(data);
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateUserData = createAsyncThunk('user/updateUserData', async (userData, { _ }) => {
    try {
        const authHeader = `Bearer ${Cookies.get('token')}`;

        const response = await fetch("https://neisiali.ir/api/user", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
            body: JSON.stringify(userData),
        });

        const responseData = await response.json();

        if (response.ok) {
            toast.success("User Updated Successfully");
        } else if (response.status === 422) {
            const errors = responseData?.errors || {};
            if (errors.email && errors.email.length > 0) {
                toast.error(errors.email[0]);
            } else if (errors.username && errors.username.length > 0) {
                toast.error(errors.username[0]);
            } else {
                throw new Error("Validation Error");
            }
        } else {
            throw new Error("Validation Error");
        }
    } catch (error) {
        throw new Error("Couldn't Send Data to API");
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
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
                state.error = action.payload;
            })
            // Update Profile Image
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update User Data
            .addCase(updateUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export { fetchUserData };
export default userSlice.reducer;
