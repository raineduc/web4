import { chakra, Box } from '@chakra-ui/react';

export const Card = chakra(Box, {
  baseStyle: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '3px',
    padding: '10px',
  },
});
