import React from "react";
import { Flex, Center, Container, Spacer, Box, Image, Text } from "@chakra-ui/react";
import logo from "../pictures/logo_light.png";

const Logo = () => (
  <Box>
    <Flex alignItems="center">
      <Image src={logo} alt="logo" boxSize="9rem" objectFit="contain" />
      <Text as="span" ml="1">Лабораторная 4</Text>
    </Flex>
  </Box>
);

const LabInfoValue = ({ children }) => <Text as="span" color="cyan.100" fontWeight="bold">{children}</Text>;

const LabInfo = () => (
  <Box fontSize="0.75em">
    <Box>Группа: <LabInfoValue>P3212</LabInfoValue></Box>
    <Box>Сделалъ: <LabInfoValue>Хузин Рамиль</LabInfoValue></Box>
  </Box>
);

export const Header = () => (
  <Center
    as="header"
    bgColor="green.500"
    color="white"
    fontSize={{ base: "1.1rem", md: "1.5rem" }}
    fontWeight="500"
    boxShadow="lg"
  >
    <Container maxW="lg">
      <Flex height="4.5rem" alignItems="center">
        <Logo />
        <Spacer />
        <LabInfo />
      </Flex>
    </Container>
  </Center>
);
