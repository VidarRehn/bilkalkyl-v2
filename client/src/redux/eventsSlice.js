import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getEvents = createAsyncThunk('events/getEvents', async () => {
    let response = await fetch('/api/events')
    let data = await response.json()
    return data
})

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: []
    },
    reducers: {
        //actions
    },
    extraReducers: {
        [getEvents.fulfilled]: (state, action) => {
            state.events = action.payload
            console.log(state.events)
        },
        [getEvents.pending]: (state) => {
            state.status = 'Loading...'
            console.log('pending')
        },
        [getEvents.rejected]: (state) => {
            state.status = 'Failed to get data.'
            console.log('failed')
        }
    }
})

export default eventsSlice.reducer