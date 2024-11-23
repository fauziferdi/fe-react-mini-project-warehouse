import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_LOGS = "http://localhost:3000/logs";

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
  const response = await axios.get(API_URL_LOGS);
  return response.data;
});

export const addLog = createAsyncThunk("logs/addLog", async (log) => {
  const response = await axios.post(API_URL_LOGS, log);
  return response.data;
});

const initialState = {
  logs: [],
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchLogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      state.loading = false;
      state.logs = action.payload;
    });
    builder.addCase(fetchLogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    builder.addCase(addLog.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addLog.fulfilled, (state, action) => {
      state.loading = false;
      state.logs.push(action.payload);
    });

    builder.addCase(addLog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default logSlice.reducer;
