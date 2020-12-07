import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { multipleActionTypeMatcher } from '$utils/redux/multiple-action-type-matcher';

const initialState = {
  isAuthenticated: false,
  logError: null,
  registerError: null,
  requestError: null,
};

const authThunkFactory = (route) => async (authData, thunkApi) => {
  const body = JSON.stringify(authData);
  const response = await fetch(route, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    const { error, field } = await response.json();
    return thunkApi.rejectWithValue({ error, field });
  }

  return;
};

const authActionPrefix = "auth";

export const logUser = createAsyncThunk(
  `${authActionPrefix}/login`,
  authThunkFactory("/api/login")
);

export const registerUser = createAsyncThunk(
  `${authActionPrefix}/register`,
  authThunkFactory("/api/register")
);

export const authSlice = createSlice({
  name: authActionPrefix,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload && (action.payload.field === 'login' || action.payload.field === 'password')) {
          state.registerError = action.payload;
        }
        state.isAuthenticated = false;
        state.requestError = (action.error && "При запросе возникла ошибка") || null;
      })
      .addCase(logUser.rejected, (state, action) => {
        if (action.payload && (action.payload.field === 'login' || action.payload.field === 'password')) {
          state.logError = action.payload;
        }
        state.isAuthenticated = false;
        state.requestError = (action.error && "При запросе возникла ошибка") || null;
      })
      .addMatcher(
        multipleActionTypeMatcher([logUser.pending, registerUser.pending]),
        (state, action) => {
          state.requestError = null;
          state.logError = null;
          state.registerError = null;
        }
      )
      .addMatcher(
        multipleActionTypeMatcher([logUser.fulfilled, registerUser.fulfilled]),
        (state, action) => {
          state.isAuthenticated = true;
          state.logError = null;
          state.registerError = null;
          state.requestError = null;
        }
      )
  },
});

