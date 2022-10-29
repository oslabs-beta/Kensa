import React, { useState } from 'react';
import { Flex, Box, Container, Divider, Stack, Avatar, Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import OperationTable from './OperationTable';
import ChartMetrics from './ChartMetrics';

const Dashboard = () => {
  const [showMetrics, setShowMetrics] = useState(false);

  return (
    <Flex flex='5' bgColor='#f9fafc' direction='column'>
      <Stack direction='row' spacing={3} bgColor='white' h='8%' w='100%' align='center' p='20px'>
        <InputGroup>
          <InputLeftElement 
            pointerEvents='none'
            // eslint-disable-next-line react/no-children-prop
            children={<Icon as={BsSearch} />}
          />
          <Input type='text' placeholder='Search' />
        </InputGroup>
        <Avatar name='Kensa' size='md' justifyItems='flex-end' />
      </Stack>

      <Divider />

      <Flex h='100%'>
        <OperationTable setShowMetrics={setShowMetrics} showMetrics={showMetrics} />
        {showMetrics && <ChartMetrics />}
      </Flex>
    </Flex>
  );
};

export default Dashboard;