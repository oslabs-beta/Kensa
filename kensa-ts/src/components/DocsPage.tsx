import * as React from "react";
import { Text, Link, Flex } from '@chakra-ui/react';
import Header from './Header';
import { Link as RouterLink } from "react-router-dom";


const DocsPage = () => {
  return (
    <>
    
      <Text fontFamily={"Garamond"} fontStyle="italic" fontWeight="550" fontSize="75px">Documentation</Text>
      
      <Link>How to use monitoring</Link>
      <br />
      <Link>How to use playground</Link>
    
    </>
  );
};

export default DocsPage;
