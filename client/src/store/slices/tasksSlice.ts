import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getHttpTasks,
  deleteHttpTask,
  createHttpTask,
  updateHttpTask,
  deleteAllHttpTask,
} from "../../api";
import { ITasksState, TypeTask } from "../../types";

export const createTaskThunk = createAsyncThunk(
  "tasks/post",
  async (task: any, { rejectWithValue }) => {
    try {
      const createdUser = await createHttpTask(task);
      return createdUser;
    } catch (error) {
      const { message }: any = error;
      console.log("error =>", message);
      return rejectWithValue(message);
    }
  }
);

export const getTasksThunk = createAsyncThunk(
  "tasks/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getHttpTasks();
      return data;
    } catch (error) {
      const { message }: any = error;
      console.log("error =>", message);
      return rejectWithValue(message);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/update",
  async (task: TypeTask, { rejectWithValue }) => {
    try {
      const { data } = await updateHttpTask(task);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (taskId: number, { rejectWithValue }) => {
    try {
      const isDeleteTask = window.confirm("Delete task?");
      if (isDeleteTask) {
        await deleteHttpTask(taskId);
        return taskId;
      } else {
        return;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAllTasksThunk = createAsyncThunk(
  "tasks/deleteAll",
  async (payload, { rejectWithValue }) => {
    try {
      const isDeleteAllTask = window.confirm("Delete all tasks?");
      if (isDeleteAllTask) {
        await deleteAllHttpTask();
      } else {
        return;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Selector for updating data tempTask in form update
const selectTempData = (state: any) => state.tasksData.tempTask;
export const selectInitialValues: any = createSelector(
  [selectTempData],
  (tempTask) => ({
    id: tempTask.id,
    body: tempTask.body,
    isDone: tempTask.isDone,
    deadline: tempTask.deadline,
  })
);

const initialState: ITasksState = {
  tasks: [],
  tempTask: {
    id: null,
    body: "",
    isDone: false,
    deadline: new Date().toLocaleString(),
  },
  isFetching: false,
  error: null,
  isEmpty: false,
  isOpenNewTask: false,
  isOpenUpdateTask: false,
};

const pendingFunction = (state: ITasksState) => {
  state.isFetching = true;
  state.error = null;
};

const rejectedFunction = (state: ITasksState, {payload}: any) => {
  state.isFetching = false;
  state.error = payload;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    isOpenNewTaskWindow: (state) => {
      state.isOpenNewTask = state.isOpenNewTask ? false : true;
    },
    isOpenUpdateTaskWindow: (state) => {
      state.isOpenUpdateTask = state.isOpenUpdateTask ? false : true;
      if (!state.isOpenUpdateTask) {
        state.tempTask = {
          id: null,
          body: "",
          isDone: false,
          deadline: new Date().toLocaleString(),
        };
      }
    },
    updateShowTask: (state, { payload }) => {
      state.isOpenUpdateTask = true;
      state.tempTask = payload;
    },
  },
  extraReducers: (builder) => {
    // CREATE
    builder
      .addCase(createTaskThunk.pending, pendingFunction)
      .addCase(createTaskThunk.fulfilled, (state, { payload }: any) => {
        state.isFetching = false;
        state.tasks.push(payload.data);
      })
      .addCase(createTaskThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
    // GET
    builder
      .addCase(getTasksThunk.pending, pendingFunction)
      .addCase(getTasksThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isEmpty = state.tasks.length === 0 ? true : false;
        state.tasks = payload;
      })
      .addCase(getTasksThunk.rejected, rejectedFunction);
    // UPDATE
    builder
      .addCase(updateTaskThunk.pending, pendingFunction)
      .addCase(updateTaskThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        const updateTaskIndex = state.tasks.findIndex(
          (task) => task.id === payload.id
        );
        state.tasks[updateTaskIndex] = { ...payload };
        console.log(payload);
      })
      .addCase(updateTaskThunk.rejected, rejectedFunction);
    // DELETE
    builder
      .addCase(deleteTaskThunk.pending, pendingFunction)
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        if (payload === undefined) {
          return;
        }
        const findDeleteIndex = state.tasks.findIndex((task) => {
          return task.id === Number(payload);
        });
        state.tasks.splice(findDeleteIndex, 1);
      })
      .addCase(deleteTaskThunk.rejected, rejectedFunction);
    // DELETE ALL TASKS
    builder
    .addCase(deleteAllTasksThunk.pending, pendingFunction)
    .addCase(deleteAllTasksThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tasks = [];
    })
    .addCase(deleteAllTasksThunk.rejected, rejectedFunction)
  },
});

const { reducer } = tasksSlice;

export const { isOpenNewTaskWindow, isOpenUpdateTaskWindow, updateShowTask } =
  tasksSlice.actions;

export default reducer;