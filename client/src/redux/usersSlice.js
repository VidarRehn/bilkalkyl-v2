import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    let response = await fetch(`/api/users`)
    let data = await response.json()
    return data
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: null
    },
    reducers: {
        //actions
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload
        },
        [getUsers.pending]: (state) => {
            state.status = 'Loading...'
        },
        [getUsers.rejected]: (state) => {
            state.status = 'Failed to get data.'
        }
    }
})

export default usersSlice.reducer