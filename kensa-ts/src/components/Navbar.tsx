import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {

  // return (
  //   <Flex minWidth='max-content' justify='space-between' p={5} paddingLeft={10} paddingRight={10} bgColor='rgb(255, 255, 255)'>
  //     <Box>Logo</Box>
  //     <Box>Why Kensa</Box>
  //     <Box>Docs</Box>
  //     <Box>Team</Box>
  //     <Box>Login</Box>
  //   </Flex>
  // );
  return (
    <div id="navbar">
      <a href="/signup">Sign up</a>
      <a href="/login">Login</a>
    </div>
  );
};

export default Navbar;