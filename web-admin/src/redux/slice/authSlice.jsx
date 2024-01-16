import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../constants/url";

const initialState = {
  user: {},
  loading: false,
  error: false,
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}users/auth/login`, {
        email,
        password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
