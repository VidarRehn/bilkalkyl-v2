import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import eventsSlice from "./eventsSlice";

const reducer = {
  reducer: {
    users: usersSlice,
    events: eventsSlice,
  },
};

const store = configureStore(reducer);

export default store;
