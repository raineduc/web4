import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, logUser, registerUser } from './features/auth';
import { gameSlice } from './features/game'
import { App } from './App';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './css/main.css';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    game: gameSlice.reducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
