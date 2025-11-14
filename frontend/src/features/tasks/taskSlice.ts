import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { TaskAPI } from './api';

const CACHE_KEY = 'tasks_cache';

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const list = await TaskAPI.list();
      localStorage.setItem(CACHE_KEY, JSON.stringify(list));
      return list;
    } catch (error) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch tasks'
      );
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async (
    payload: {
      title: string;
      description: string;
      priority: string;
      assignee: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const task = await TaskAPI.create(payload);
      return task;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to add task'
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (
    {
      id,
      changes,
    }: {
      id: string;
      changes: {
        title: string;
        description: string;
        priority: string;
        assignee: string;
        status: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const task = await TaskAPI.update(Number(id), changes);
      return task;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to update task'
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await TaskAPI.delete(Number(id));
      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to delete task'
      );
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  'task/status/update',
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const task = await TaskAPI.updateStatus(Number(id), status);
      return task;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to update status'
      );
    }
  }
);

const slice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    filters: { query: '', priority: 'all', assignee: 'all' },
    meta: { loading: false, error: null },
  },
  reducers: {
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
    setPriority(state, action) {
      state.filters.priority = action.payload;
    },
    setAssignee(state, action) {
      state.filters.assignee = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.meta.loading = true;
        state.meta.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.meta.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.meta.loading = false;
        state.meta.error = action.payload;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export const { setQuery, setPriority, setAssignee } = slice.actions;
export default slice.reducer;

const selectItems = (s) => s.tasks.items;
const selectFilters = (s) => s.tasks.filters;
export const selectMeta = (s) => s.tasks.meta;

export const selectFilteredTasks = createSelector(
  [selectItems, selectFilters],
  (items, filters) => {
    const query = (filters.query || '').trim().toLowerCase();
    const filteredByText = query
      ? items.filter((t) =>
          (t.title + ' ' + t.description).toLowerCase().includes(query)
        )
      : items;
    const filteredByPriority =
      filters.priority === 'all'
        ? filteredByText
        : filteredByText.filter((t) => t.priority === filters.priority);
    const filteredByAssignee =
      filters.assignee === 'all'
        ? filteredByPriority
        : filteredByPriority.filter((t) => t.assignee === filters.assignee);

    return {
      todo: filteredByAssignee.filter((t) => t.status === 'todo'),
      'in-progress': filteredByAssignee.filter(
        (t) => t.status === 'in-progress'
      ),
      done: filteredByAssignee.filter((t) => t.status === 'done'),
    };
  }
);
