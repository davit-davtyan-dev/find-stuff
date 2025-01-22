import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signOut} from './auth';
import spacesApi, {Space} from '../../api/spaces.api';
import userToSpaceApi, {UserToSpace} from '../../api/userToSpace.api';

export interface SpaceState {
  userSpaces: Array<UserToSpace>;
  currentSpace: Space | null;
}

const initialState: SpaceState = {
  userSpaces: [],
  currentSpace: null,
};

export const fetchUserSpaces = createAsyncThunk(
  'space/fetchUserSpaces',
  async ({userId}: {userId: string}) => {
    const currentUserSpaces = await userToSpaceApi.get({userId});
    const spaceIds = currentUserSpaces.map(space => space.spaceId);
    const spaces = await spacesApi.get({id: {in: spaceIds}});

    return currentUserSpaces.map(userToSpace => ({
      ...userToSpace,
      space: spaces.find(space => space.id === userToSpace.spaceId),
    }));
  },
);

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserSpaces.pending, () => {})
      .addCase(fetchUserSpaces.fulfilled, (state, action) => {
        state.userSpaces = action.payload;
        if (!state.currentSpace) {
          const currentSpace = state.userSpaces.find(
            userSpace => userSpace.space,
          );
          state.currentSpace = currentSpace?.space || null;
        }
      })
      .addCase(fetchUserSpaces.rejected, () => {})
      .addCase(signOut.fulfilled, () => initialState);
  },
});

export default spaceSlice.reducer;
