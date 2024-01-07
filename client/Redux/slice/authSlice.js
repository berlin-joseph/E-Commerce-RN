import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../constants/url';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
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
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = true;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials';
        }
        state.error = action.error.message;
      });
  },
});

export const {signUp, login, logout} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
