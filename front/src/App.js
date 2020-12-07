import { hot } from "react-hot-loader/root";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from './theme';
import { HomePage } from './pages/Home';
import { Header } from './components/Header';

export const App = hot(() => (
  <ChakraProvider theme={theme}> 
    <HomePage />
  </ChakraProvider>
));
