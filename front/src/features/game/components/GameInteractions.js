import React from 'react';
import { HStack } from '@chakra-ui/react';
import { GameForm } from './GameForm';
import { GameArea } from './GameArea';
import { Card } from '$ui/components/Card';

export const GameInteractions = () => (
  <HStack spacing="20px" align="stretch">
    <Card w="50%">
      <GameForm />
    </Card>
    <Card w="50%">
      <GameArea />
    </Card>
  </HStack>
);
