import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  user: {},
  status: null,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}users/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('Login failed');
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      // console.log(action.payload.message);
      state.error = action.payload.message;
    });
  },
});

export const {logout} = authSlice.actions;

export const selectUser = state => state.user.user;
export default authSlice.reducer;