import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <Box h="100vh" w="100%" id="landing-page">
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

export default LandingPage;
