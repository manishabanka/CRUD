import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import customerReducer from "../features/customers/customerSlice";
import editControllerSlice from "../features/customers/editControllerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customers: customerReducer,
    edit: editControllerSlice,
  },
});
