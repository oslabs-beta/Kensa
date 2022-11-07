import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import KensaNavbar from './KensaNavbar';
import Sidebar from './Sidebar';

const Kensa = () => {

  return (
    <Flex h='100vh' w='100vw'>
      <Sidebar />
      <Flex flex='5' direction='column'>
        <KensaNavbar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Kensa;