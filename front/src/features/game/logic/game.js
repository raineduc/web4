import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendHit as sendHitApi } from '$api/game';

const initialState = {
  requestError: null,
  dataError: null,
  lastPostedHit: null,
  lastPostedHits: [],
};

export const sendHit = createAsyncThunk(
  'game/send',
  async (data, thunkApi) => {
    const response = await sendHitApi(data);
    if (!response.ok) {
      const { error, field } = await response.json();
      return thunkApi.rejectWithValue({ error, field });
    }
    const hit = await response.json();
    return hit;
  },
);

export const hitArea = createAsyncThunk(
  'game/send',
  async (data, thunkApi) => {
    // const response = await sendHitApi(data);
    // if (!response.ok) {
    //   throw new Error('Ошибка при запросе');
    // }
    // const hit = await response.json();
    // return hit;
    return { x: data['x-coord'], y: data['y-coord'], hit: true };
  },
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendHit.rejected, (state, action) => {
        if (action.payload) {
          state.dataError = action.payload;
        }
        state.requestError = (action.error && 'При запросе возникла ошибка') || null;
      })
      .addCase(sendHit.pending, (state, action) => {
        state.requestError = null;
        state.dataError = null;
      })
      .addCase(sendHit.fulfilled, (state, action) => {
        state.requestError = null;
        state.dataError = null;
        const { x, y, hit } = action.payload;
        state.lastPostedHits.push({
          x,
          y,
          hit,
        });
        state.lastPostedHit = action.payload;
      });
  },
});
