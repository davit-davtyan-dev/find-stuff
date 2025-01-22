import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signOut} from './auth';
import itemsApi, {Item, ItemFormData} from '../../api/items.api';

export interface ItemState {
  items: Array<Item>;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ItemState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const fetchItems = createAsyncThunk(
  'item/fetchItems',
  async ({spaceId}: {spaceId: string}) => itemsApi.get({spaceId}),
);

export const createItem = createAsyncThunk(
  'item/createItem',
  async ({data}: {data: ItemFormData}) => itemsApi.create(data),
);

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({id, data}: {id: string; data: Partial<ItemFormData>}) =>
    itemsApi.update(id, data),
);

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async ({id}: {id: string}) => itemsApi.delete(id),
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.fetchLoading = false;
      })
      .addCase(fetchItems.rejected, state => {
        state.fetchLoading = false;
      })
      .addCase(createItem.pending, state => {
        state.createLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.createLoading = false;
      })
      .addCase(createItem.rejected, state => {
        state.createLoading = false;
      })
      .addCase(updateItem.pending, state => {
        state.updateLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const {id, data} = action.meta.arg;

        state.items = state.items.map(item =>
          item.id === id ? {...item, ...data} : item,
        );
        state.updateLoading = false;
      })
      .addCase(updateItem.rejected, state => {
        state.updateLoading = false;
      })
      .addCase(deleteItem.pending, state => {
        state.deleteLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const {id} = action.meta.arg;

        state.items = state.items.filter(item => item.id !== id);
        state.deleteLoading = false;
      })
      .addCase(deleteItem.rejected, state => {
        state.deleteLoading = false;
      })
      .addCase(signOut.fulfilled, () => initialState);
  },
});

export default itemSlice.reducer;
