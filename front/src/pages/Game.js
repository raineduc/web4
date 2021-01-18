import React from 'react';
import { Container } from '@chakra-ui/react';
import { GameInteractions } from '../features/game';
import { Header } from '../components/Header';

export default () => (
  <>
    <Header />
    <Container maxW="lg" mt="16">
      <GameInteractions />
    </Container>
  </>
);
