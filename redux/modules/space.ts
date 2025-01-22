import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signOut} from './auth';
import spacesApi, {Space} from '../../api/spaces.api';
import userToSpaceApi, {UserToSpace} from '../../api/userToSpace.api';

export interface SpaceState {
  userSpaces: Array<UserToSpace>;
  userSpacesLoading: boolean;
  currentSpace: Space | null;
  currentSpaceLoading: boolean;
}

const initialState: SpaceState = {
  userSpaces: [],
  userSpacesLoading: false,
  currentSpace: null,
  currentSpaceLoading: false,
};

export const fetchUserSpaces = createAsyncThunk(
  'space/fetchUserSpaces',
  ({userId}: {userId: string}) => userToSpaceApi.get({userId}),
);

export const fetchCurrentSpaces = createAsyncThunk(
  'space/fetchCurrentSpaces',
  ({spaceId}: {spaceId: string}) => spacesApi.getById(spaceId),
);

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserSpaces.pending, state => {
        state.userSpacesLoading = true;
      })
      .addCase(fetchUserSpaces.fulfilled, (state, action) => {
        state.userSpaces = action.payload;
        state.userSpacesLoading = false;
      })
      .addCase(fetchUserSpaces.rejected, state => {
        state.userSpacesLoading = false;
      })
      .addCase(fetchCurrentSpaces.pending, state => {
        state.currentSpaceLoading = true;
      })
      .addCase(fetchCurrentSpaces.fulfilled, (state, action) => {
        state.currentSpace = action.payload;
        state.currentSpaceLoading = false;
      })
      .addCase(fetchCurrentSpaces.rejected, state => {
        state.currentSpaceLoading = false;
      })
      .addCase(signOut.fulfilled, () => initialState);
  },
});

export default spaceSlice.reducer;
