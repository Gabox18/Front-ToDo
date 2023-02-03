import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  AllTask: [],
  post: {},
  delete: "",
  done: "",
  edit: {},
};

export const dataSlice = createSlice({
  name: "ToDoSlice",
  initialState,
  reducers: {
    getAllTask: (state, action) => {
      state.AllTask = action.payload;
    },
    postTask: (state, action) => {
      state.post = action.payload;
    },
    deleteTask: (state, action) => {
      state.delete = action.payload;
    },
    doneTask: (state, action) => {
      state.done = action.payload;
    },
    editTask: (state, action) => {
      state.edit = action.payload;
    },
  },
});

export const asyncGetTask = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get();
      return dispatch(getAllTask(response.data));
    } catch (error) {
      console.log("error en dispatch getTask", error);
    }
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

export const asyncDeleteTask = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.delete(`/tasks/delete/${id}`);
      return dispatch(deleteTask(response.data));
    } catch (error) {
      console.log("error en dispatch DeleteTodo", error);
    }
  };
};

export const asyncDone = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/tasks/done/${id}`);
      return dispatch(doneTask(response.data));
    } catch (error) {
      console.log("error en dispatch done", error);
    }
  };
};

export const asyncEditTask = (id, taskUpdate) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/tasks/edit/${id}`, taskUpdate);
      return dispatch(editTask(response.data));
    } catch (error) {
      console.log("error en dispatch editTask", error);
    }
  };
};

export const { postTask, getAllTask, deleteTask, doneTask, editTask } =
  dataSlice.actions;

export default dataSlice.reducer;
