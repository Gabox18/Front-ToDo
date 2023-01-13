import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}
};

export const dataSlice = createSlice({
  name: "ToDoSlice",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});


export const { getUser } = dataSlice.actions;
  
  export default dataSlice.reducer;
  