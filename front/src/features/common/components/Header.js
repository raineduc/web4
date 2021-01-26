import React from 'react';
import {
  Flex,
  Center,
  Container,
  Spacer,
  Box,
  Image,
  Text,
  Button,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../auth/';
import logo from '../../../pictures/logo_light.png';

const LabInfoValue = ({ children }) => (
  <Text as="span" color="cyan.100" fontWeight="bold">
    {children}
  </Text>
);

const LabInfo = () => (
  <Box fontSize="0.75em">
    <Box>
      Группа:
      {' '}
      <LabInfoValue>P3212</LabInfoValue>
    </Box>
    <Box>
      Сделалъ:
      {' '}
      <LabInfoValue>Хузин Рамиль</LabInfoValue>
    </Box>
  </Box>
);

const Logo = () => (
  <Box>
    <Flex alignItems="center">
      <Image src={logo} alt="logo" boxSize="9.5rem" objectFit="contain" />
      <Box ml="1">
        <Text lineHeight="short">Лабораторная 4</Text>
        <Text
          fontSize={{ base: '0.75em', md: '0.65em' }}
          lineHeight="none"
          position="absolute"
        >
          Вариант:
          {' '}
          <LabInfoValue>31772</LabInfoValue>
        </Text>
      </Box>
    </Flex>
  </Box>
);

export const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const [isLabInfoVisible] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  return (
    <Center
      as="header"
      bgColor="green.500"
      color="white"
      fontSize={{ base: '1.1rem', md: '1.25rem', lg: '1.5rem' }}
      fontWeight="500"
      boxShadow="lg"
    >
      <Container maxW="1228px">
        <Flex height="5rem" alignItems="center">
          <Logo />
          <Spacer />
          {isAuthenticated && (
            <Button
              colorScheme="green"
              color="teal.50"
              bg="none"
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing="wide"
              marginRight="20px"
              onClick={() => dispatch(logoutUser(history))}
            >
              Выйти
            </Button>
          )}
          {isLabInfoVisible && <LabInfo />}
        </Flex>
      </Container>
    </Center>
  );
};
