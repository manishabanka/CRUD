import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEdit: false,
};

const editControllerSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    makeEditTrueFalse: (state, action) => {
      return { ...state, isEdit: action.payload };
      // console.log("make it true", state.edit);
      // console.log(action.payload, state.edit);
    },
  },
});

export const { makeEditTrueFalse } = editControllerSlice.actions;

export default editControllerSlice.reducer;
