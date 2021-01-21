import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { sendHit as sendHitApi, getUserHits } from '$api/game';

const initialState = {
  requestError: null,
  dataError: null,
  lastPostedHit: null,
  lastPostedHits: [],
  requestedHits: [],
  hitsLimit: 10,
  pageCount: 1,
  currentPage: 1,
};

export const changePage = createAction('game/changePage');

export const sendHit = createAsyncThunk('game/send', async (data, thunkApi) => {
  const response = await sendHitApi(data);
  if (!response.ok) {
    const { error, field } = await response.json();
    return thunkApi.rejectWithValue({ error, field });
  }
  const hit = await response.json();
  return hit;
});

export const getHits = createAsyncThunk(
  'game/get',
  async (currentPage, thunkApi) => {
    thunkApi.dispatch(changePage(currentPage));
    const limit = thunkApi.getState().game.hitsLimit;
    const offset = limit * (currentPage - 1);
    const response = await getUserHits(limit, offset);
    if (!response.ok) {
      const { error } = await response.json();
      return thunkApi.rejectWithValue({ error });
    }
    const { hits, totalCount } = await response.json();
    return { hits, totalCount };
  },
);

export const hitArea = createAsyncThunk('game/send', async (data, thunkApi) => {
  const response = await sendHitApi(data);
  if (!response.ok) {
    throw new Error('Ошибка при запросе');
  }
  const hit = await response.json();
  return hit;
});

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changePage, (state, action) => {
      state.currentPage = action.payload;
    })
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
      state.lastPostedHits.push(action.payload);
      state.lastPostedHit = action.payload;
    })
    .addCase(getHits.pending, (state) => {
      state.requestError = null;
    })
    .addCase(getHits.fulfilled, (state, action) => {
      const { hits, totalCount } = action.payload;
      state.requestError = null;
      state.requestedHits = hits;
      if (Math.ceil(totalCount / state.hitsLimit) !== state.pageCount) {
        state.pageCount = Math.ceil(totalCount / state.hitsLimit) || 1;
      }
    })
    .addCase(getHits.rejected, (state) => {
      state.requestError = 'При запросе возникла ошибка';
    });
});
