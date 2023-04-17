import React from 'react';
import { Center, Alert, AlertIcon } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Center w="100%" h="100%">
      <Alert
        status="error"
        h="100px"
        w="50%"
        borderRadius="10px"
        className="alert"
      >
        <AlertIcon />
        404 Not Found
      </Alert>
    </Center>
  );
};

export default NotFound;
