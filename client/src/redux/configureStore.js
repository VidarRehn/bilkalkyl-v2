import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import eventsSlice from "./eventsSlice";
import bookingsSlice from "./bookingsSlice";
import paymentsSlice from "./paymentsSlice";

const reducer = {
  reducer: {
    users: usersSlice,
    events: eventsSlice,
    bookings: bookingsSlice,
    payments: paymentsSlice
  },
};

const store = configureStore(reducer);

export default store;
