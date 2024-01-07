import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async ({email, password}, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}users/auth/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: state => {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const {login} = authSlice.actions;

export default authSlice.reducer;
