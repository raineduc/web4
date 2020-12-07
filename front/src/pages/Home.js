import React from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { AuthPanel } from '../components/AuthPanel';

export const HomePage = () => (
  <>
    <Header />
    <Container maxW="lg" mt="16">
      <AuthPanel />
    </Container>
  </>
);