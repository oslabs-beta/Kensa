import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

const OperationTable = ({ showMetrics, setShowMetrics }: any) => {
  return (
    <Flex flex='1' bgColor='lightblue'>
      Operation Table
      <Button onClick={() => setShowMetrics(!showMetrics)}>Show Chart</Button>
    </Flex>
  );
};

export default OperationTable;