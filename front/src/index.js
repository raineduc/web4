import { App } from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { authSlice, logUser, registerUser } from './features/auth/';
import { configureStore } from '@reduxjs/toolkit';
import './css/main.css';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

