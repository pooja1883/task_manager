import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

const delay = ms => new Promise(res => setTimeout(res, ms));

const loadTasks = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = tasks =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  await delay(500);
  return loadTasks();
});

export const addTask = createAsyncThunk(
  "tasks/add",
  async task => {
    await delay(400);

    const tasks = loadTasks();

    const newTask = {
      id: nanoid(),
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTasks(tasks);

    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async updatedTask => {
    await delay(400);

    let newTask = null;

    const tasks = loadTasks().map(t => {
      if (t.id === updatedTask.id) {
        newTask = {
          ...updatedTask,
          updatedAt: new Date().toISOString(),
        };
        return newTask;
      }
      return t;
    });

    saveTasks(tasks);

    return newTask; // <-- return the correct updated version
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async id => {
    await delay(300);

    const tasks = loadTasks().filter(t => t.id !== id);
    saveTasks(tasks);

    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    entities: [],
    loading: false,
    error: null,
    undoTask: null,
  },

  reducers: {
    restoreTask(state) {
      if (state.undoTask) {
        state.entities.push(state.undoTask);
        saveTasks(state.entities);
        state.undoTask = null;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to load tasks";
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.entities = state.entities.map(t =>
          t.id === action.payload.id ? action.payload : t
        );
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        const removed = state.entities.find(t => t.id === action.payload);
        state.entities = state.entities.filter(t => t.id !== action.payload);
        state.undoTask = removed;
      });
  },
});

export const { restoreTask } = tasksSlice.actions;
export default tasksSlice.reducer;
