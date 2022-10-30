import React from 'react';
import { Flex, Divider } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import KensaNavbar from './KensaNavbar';
import Sidebar from './Sidebar';

const Kensa = () => {

  return (
    <Flex h='100vh' w='100vw'>
      <Sidebar />
      <Flex flex='5' bgColor='#f9fafc' direction='column'>
        <KensaNavbar />
        <Divider />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Kensa;