import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signOut} from './auth';
import roomsApi, {Room, RoomFormData} from '../../api/rooms.api';

export interface RoomState {
  rooms: Array<Room>;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: RoomState = {
  rooms: [],
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const fetchRooms = createAsyncThunk(
  'room/fetchRooms',
  async ({spaceId}: {spaceId: string}) => roomsApi.get({spaceId}),
);

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async ({data}: {data: RoomFormData}) => roomsApi.create(data),
);

export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ({id, data}: {id: string; data: Partial<RoomFormData>}) =>
    roomsApi.update(id, data),
);

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async ({id}: {id: string}) => roomsApi.delete(id),
);

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRooms.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.fetchLoading = false;
      })
      .addCase(fetchRooms.rejected, state => {
        state.fetchLoading = false;
      })
      .addCase(createRoom.pending, state => {
        state.createLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms = [...state.rooms, action.payload];
        state.createLoading = false;
      })
      .addCase(createRoom.rejected, state => {
        state.createLoading = false;
      })
      .addCase(updateRoom.pending, state => {
        state.updateLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const {id, data} = action.meta.arg;

        state.rooms = state.rooms.map(room =>
          room.id === id ? {...room, ...data} : room,
        );
        state.updateLoading = false;
      })
      .addCase(updateRoom.rejected, state => {
        state.updateLoading = false;
      })
      .addCase(deleteRoom.pending, state => {
        state.deleteLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        const {id} = action.meta.arg;

        state.rooms = state.rooms.filter(room => room.id !== id);
        state.deleteLoading = false;
      })
      .addCase(deleteRoom.rejected, state => {
        state.deleteLoading = false;
      })
      .addCase(signOut.fulfilled, () => initialState);
  },
});

export default roomSlice.reducer;
