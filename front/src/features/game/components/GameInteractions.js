import React from 'react';
import { Stack } from '@chakra-ui/react';
import { GameForm } from './GameForm';
import { GameArea } from './GameArea';
import { Card } from '$ui/components/Card';

export const GameInteractions = () => (
  <>
    <Stack spacing="20px" align="stretch" direction={{ base: 'column', lg: 'row' }}>
      <Card w={{ base: '100%', lg: '50%' }}>
        <GameForm />
      </Card>
      <Card w={{ base: '100%', lg: '50%' }}>
        <GameArea />
      </Card>
    </Stack>
  </>
);
