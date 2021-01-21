import React from 'react';
import {
  Tabs, TabList, TabPanel, Tab, TabPanels,
} from '@chakra-ui/react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

export const AuthPanel = () => (
  <Tabs
    colorScheme="green"
    variant="enclosed-colored"
    size="lg"
    isFitted
    color="gray.700"
  >
    <TabList>
      <Tab fontWeight="medium">Вход</Tab>
      <Tab fontWeight="medium">Регистрация</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <LoginForm />
      </TabPanel>
      <TabPanel>
        <RegisterForm />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
