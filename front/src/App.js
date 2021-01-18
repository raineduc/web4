import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes } from './pages/routes';
import { theme } from './theme';

export const App = hot(() => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes />
    </Router>
  </ChakraProvider>
));
