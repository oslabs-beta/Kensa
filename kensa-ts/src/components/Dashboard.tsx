import React from 'react';
import { Flex, Box, Container, Divider, Stack, Avatar, Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const Dashboard = () => {
  return (
    <Flex flex='6' bgColor='#f9fafc' direction='column'>
      <Stack direction='row' spacing={3} bgColor='white' h='7%' w='100%' align='center' p='20px'>
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
      <Container>
        Stats
      </Container>
    </Flex>
  );
};

export default Dashboard;