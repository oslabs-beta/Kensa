import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import { Outlet } from "react-router-dom";


const LandingPage = ()=> {
  
  return (
    <>
      <Box h='calc(100vh)' w='100%'>
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

export default LandingPage;