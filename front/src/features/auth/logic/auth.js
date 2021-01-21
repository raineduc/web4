import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { multipleActionTypeMatcher } from '$utils/redux/multiple-action-type-matcher';
import { postAuthCredentials, checkLoginStatus, logout } from '$api/auth';

const initialState = {
  isAuthenticated: false,
  hasAuthCheckedBefore: false,
  logError: null,
  registerError: null,
  requestError: null,
};

const authThunkFactory = (isRegister) => async (authData, thunkApi) => {
  const response = await postAuthCredentials(isRegister, authData);

  if (!response.ok) {
    const { error, field } = await response.json();
    return thunkApi.rejectWithValue({ error, field });
  }
};

const authActionPrefix = 'auth';

export const isUserLoggedIn = createAsyncThunk(
  `${authActionPrefix}/isUserLoggedIn`,
  async () => {
    const response = await checkLoginStatus();
    const { isLoggedIn } = await response.json();
    return isLoggedIn;
  },
);

export const logoutUser = createAsyncThunk(
  `${authActionPrefix}/logout`,
  async (history) => {
    await logout();
    history.push('/');
  },
);

export const logUser = createAsyncThunk(
  `${authActionPrefix}/login`,
  authThunkFactory(false),
);

export const registerUser = createAsyncThunk(
  `${authActionPrefix}/register`,
  authThunkFactory(true),
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
        state.hasAuthCheckedBefore = true;
        state.isAuthenticated = false;
        state.requestError = (action.error && 'При запросе возникла ошибка') || null;
      })
      .addCase(logUser.rejected, (state, action) => {
        if (action.payload && (action.payload.field === 'login' || action.payload.field === 'password')) {
          state.logError = action.payload;
        }
        state.hasAuthCheckedBefore = true;
        state.isAuthenticated = false;
        state.requestError = (action.error && 'При запросе возникла ошибка') || null;
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        state.hasAuthCheckedBefore = true;
        state.isAuthenticated = action.payload;
        state.registerError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.hasAuthCheckedBefore = true;
        state.isAuthenticated = false;
        state.registerError = null;
      })
      .addMatcher(multipleActionTypeMatcher([isUserLoggedIn.rejected, logoutUser.rejected]), (state) => {
        state.requestError = 'При запросе возникла ошибка';
      })
      .addMatcher(
        multipleActionTypeMatcher([logUser.pending, registerUser.pending, isUserLoggedIn.pending]),
        (state, action) => {
          state.requestError = null;
          state.logError = null;
          state.registerError = null;
        },
      )
      .addMatcher(
        multipleActionTypeMatcher([logUser.fulfilled, registerUser.fulfilled]),
        (state, action) => {
          state.hasAuthCheckedBefore = true;
          state.isAuthenticated = true;
          state.logError = null;
          state.registerError = null;
          state.requestError = null;
        },
      );
  },
});
