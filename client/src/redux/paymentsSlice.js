import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPayments = createAsyncThunk('payments/getPayments', async () => {
    let response = await fetch('/api/payments')
    let data = await response.json()
    return data
})

const paymentsSlice = createSlice({
    name: 'payments',
    initialState: {
        payments: null
    },
    reducers: {
        //actions
    },
    extraReducers: {
        [getPayments.fulfilled]: (state, action) => {
            let array = [] 
            action.payload.forEach(user => {
                user.payments.forEach(payment => {
                    let obj = {
                        user: user.name,
                        amountPaid: payment.amountPaid,
                        paymentDate: payment.paymentDate,
                        comment: payment.comment,   
                    }
                    array.push(obj)
                });
            })
            state.payments = array
        },
        [getPayments.pending]: (state) => {
            state.status = 'Loading...'
        },
        [getPayments.rejected]: (state) => {
            state.status = 'Failed to get data.'
        }
    }
})

export default paymentsSlice.reducer