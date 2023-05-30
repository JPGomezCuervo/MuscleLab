import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL, fulfilled, pending, rejected } from "../../utils/constants";
import axios from "axios";
import { userCleaner, monitorsCleaner } from "../../utils/cleanerUtils";

const fetchAllUsers = createAsyncThunk("users/fetchAllUsers", async () => {
  try {
    const response = await axios.get(`${URL}/users`);
    return response.data;
  } catch (error) {
    // revisar como el back envia los errores
    throw new Error(error.response);
  }
});
const fetchDeletedUsers = createAsyncThunk("users/deleted", async () => {
  try {
    const response = await axios.get(`${URL}/users/deleted`);
    return response.data;
  } catch (error) {
    // revisar como el back envia los errores
    throw new Error(error.response);
  }
});

const fetchAllMonitors = createAsyncThunk(
  "users/fetchAllMonitors",
  async () => {
    try {
      const response = await axios.get(`${URL}/users/monitor`);
      return response.data;
    } catch (error) {
      // revisar como el back envia los errores
      throw new Error(error.response);
    }
  }
);

const fetchUserByID = createAsyncThunk("users/fetchUserByID", async (id) => {
  try {
    const response = await axios.get(`${URL}/users/${id}`);
    return response.data;
  } catch (error) {
    // revisar como el back envia los errores
    throw new Error(error.response);
  }
});

const initialState = {
  users: [],
  deleted: [],
  user: {},
  monitors: [],
  status: "idle",
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = fulfilled;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.status = pending;
        state.error = '';
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = rejected;
        state.error = action.error;
      })
      .addCase(fetchDeletedUsers.fulfilled, (state, action) => {
        state.status = fulfilled;
        state.error = '';
        state.deleted = action.payload;
      })
      .addCase(fetchDeletedUsers.pending, (state, action) => {
        state.status = pending;
        state.error = '';
      })
      .addCase(fetchDeletedUsers.rejected, (state, action) => {
        state.status = rejected;
        state.error = action.error;
      })
      .addCase(fetchUserByID.fulfilled, (state, action) => {
        const cleanedUser = userCleaner(action.payload);
        state.status = fulfilled;
        state.error = "";
        state.user = cleanedUser;
      })
      .addCase(fetchUserByID.pending, (state, action) => {
        state.status = pending;
        state.error = "";
      })
      .addCase(fetchUserByID.rejected, (state, action) => {
        state.status = rejected;
        //revisar sintaxis del error
        state.error = action.error;
      })
      .addCase(fetchAllMonitors.fulfilled, (state, action) => {
        const cleanedMonitors = monitorsCleaner(action.payload);
        state.status = fulfilled;
        state.error = "";
        state.monitors = cleanedMonitors;
      })
      .addCase(fetchAllMonitors.pending, (state, action) => {
        state.status = pending;
        state.error = "";
      })
      .addCase(fetchAllMonitors.rejected, (state, action) => {
        state.status = rejected;
        //revisar sintaxis del error
        state.error = action.error;
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectDeletedUsers = (state) => state.users.deleted;
export const selectUserByID = (state) => state.users.user;
export const selectAllMonitors = (state) => state.users.monitors;
export const selectStatus = (state) => state.users.status;
export const selectError = (state) => state.users.error;
export default usersSlice.reducer;
export { fetchAllUsers, fetchAllMonitors, fetchUserByID, fetchDeletedUsers };
