import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBookings = createAsyncThunk('bookings/getBookings', async () => {
    let response = await fetch('/api/bookings')
    let data = await response.json()
    return data
})

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: null
    },
    reducers: {

    },
    extraReducers: {
        [getBookings.fulfilled]: (state, action) => {
            let array = [] 
            action.payload.forEach(user => {
                user.bookings.forEach(booking => {
                    let obj = {
                        user: user.name,
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                        comment: booking.comment,
                        id: booking._id
                    }
                    array.push(obj)
                });
            })
        state.bookings = array
        },
        [getBookings.pending]: (state) => {
            state.status = 'Loading...'
        },
        [getBookings.rejected]: (state) => {
            state.status = 'Failed to get data.'
        }
    }
})

// export const { getAllBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer