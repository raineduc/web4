import { hot } from "react-hot-loader/root";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from './theme';
import { Header } from './components/Header';

export const App = hot(() => (
  <ChakraProvider theme={theme}> 
    <Header />
  </ChakraProvider>
));
