import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  AllTask: [],
  postTask: {},
};

export const dataSlice = createSlice({
  name: "ToDoSlice",
  initialState,
  reducers: {
    getAllTask: (state, action) => {
      state.AllTask = action.payload;
    },
    postTask: (state, action) => {
      state.Task = action.payload;
    },
  },
});

export const asyncGetTask = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get();
      return dispatch(getAllTask(response.data));
    } catch (error) {}
  };
};

export const asyncPostTask = (Task) => {
  return async function (dispatch) {
    try {
      let response = await axios.post("/tasks/add", Task);
      return dispatch(postTask(response.data));
    } catch (error) {
      console.log("error en dispatch PostTodo", error);
    }
  };
};

export const { postTask, getAllTask } = dataSlice.actions;

export default dataSlice.reducer;
