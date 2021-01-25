import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Header } from '../features/common/components/Header';
import { AuthPanel, IfLoggedIn } from '../features/auth';

const HomePage = () => (
  <>
    <Header />
    <Container maxW="1024px" mt="16">
      <AuthPanel />
    </Container>
  </>
);

export default () => (
  <IfLoggedIn
    fallback={<HomePage />}
    renderOnLoading={<div>Загрузка...</div>}
  >
    <Redirect to="/game" />
  </IfLoggedIn>
);
