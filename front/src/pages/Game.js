import React from 'react';
import { Container } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import { GameInteractions, HitResults } from '../features/game';
import { IfLoggedIn } from '../features/auth';
import { Header } from '../features/common/components/Header';

export default () => (
  <IfLoggedIn
    fallback={<Redirect to="/" />}
    renderOnLoading={<div>Загрузка...</div>}
  >
    <Header />
    <Container maxWidth="1024px" mt="16" mb="10">
      <GameInteractions />
      <HitResults />
    </Container>
  </IfLoggedIn>
);
