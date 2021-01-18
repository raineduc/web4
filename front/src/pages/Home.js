import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { AuthPanel } from '../components/AuthPanel';

export default () => (
  <>
    <Header />
    <Container maxW="lg" mt="16">
      <AuthPanel />
      <Link to="/game">dsadas</Link>
    </Container>
  </>
);
