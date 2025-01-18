import {
  initializeUserApi,
  loginWithGoogleApi,
  signOutApi,
  type User,
} from '../../api/auth.api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
  loading: false,
};

export const signIn = createAsyncThunk('auth/login', loginWithGoogleApi);
export const initializeUser = createAsyncThunk(
  'auth/initializeUser',
  initializeUserApi,
);
export const signOut = createAsyncThunk('auth/signOut', signOutApi);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(initializeUser.pending, state => {
        state.loading = true;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isInitialized = true;
        state.user = action.payload;
      })
      .addCase(initializeUser.rejected, state => {
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(signIn.pending, state => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, state => {
        state.loading = false;
      })
      .addCase(signOut.pending, state => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, state => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, state => {
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
