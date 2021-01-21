import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, logUser, registerUser } from './features/auth';
import { gameReducer } from './features/game';
import { App } from './App';
import { makeServer } from './mock-server';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    game: gameReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
