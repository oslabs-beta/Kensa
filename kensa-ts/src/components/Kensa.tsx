import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

const Kensa = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Dashboard />
    </Flex>
  );
};

export default Kensa;