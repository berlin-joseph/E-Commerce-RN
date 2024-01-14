import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  user: {},
  loading: false,
  error: false,
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}users/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    });
    builder.addCase(fetchUser.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {logout} = authSlice.actions;
export const SelectAllUser = state => state.auth;
export default authSlice.reducer;
