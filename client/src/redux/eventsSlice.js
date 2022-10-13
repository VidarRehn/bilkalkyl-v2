import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getEvents = createAsyncThunk('events/getEvents', async () => {
    let response = await fetch('/api/events')
    let data = await response.json()
    return data
})

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: null,
        lastMileage: null
    },
    reducers: {
        //actions
    },
    extraReducers: {
        [getEvents.fulfilled]: (state, action) => {
            let array = [] 
            action.payload.filter(user => user.name !== 'Harriet & Jon-Erik').forEach(user => {
                user.events.forEach(event => {
                    let obj = {
                        user: user.name,
                        eventDate: event.eventDate,
                        mileageBefore: event.mileageBefore,
                        mileageAfter: event.mileageAfter,   
                    }
                    array.push(obj)
                });
            })
        let sortedArray = array.sort((a, b) => b.mileageAfter - a.mileageAfter)
        state.events = sortedArray
        state.lastMileage = sortedArray[0].mileageAfter
        },
        [getEvents.pending]: (state) => {
            state.status = 'Loading...'
        },
        [getEvents.rejected]: (state) => {
            state.status = 'Failed to get data.'
        }
    }
})

export default eventsSlice.reducer