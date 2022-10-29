import React from 'react';
import { Box, Flex, Heading, Stack, Icon, Divider } from '@chakra-ui/react';
import { BsFillBarChartFill, BsFillFolderFill, BsFillPlayBtnFill } from 'react-icons/bs';
import { MdSpaceDashboard } from 'react-icons/md';

const Sidebar = () => {
  return (
    <Box flex='1' bg='#121828'>
      <Flex h='180px' justify='center' align='center' color='#d6c5c7'>
        Logo
      </Flex>
      <Divider color='#d6c5c7' />
      <Stack spacing={3} direction='column' color='white' marginTop={10} >
        <Flex align='center' p='20px' gap={3} color='#d6c5c7' _hover={{ 
          bgColor: '#2d2d32', cursor: 'pointer' }}>
          <Icon as={MdSpaceDashboard} boxSize='1.4rem'/>
          <Heading size='sm'>Dashboard</Heading>
        </Flex>
        <Flex align='center' p='20px' gap={3} color='#d6c5c7' _hover={{ 
          bgColor: '#2d2d32', cursor: 'pointer' }}>
          <Icon as={BsFillFolderFill} boxSize='1.4rem' />
          <Heading size='sm'>Projects</Heading>
        </Flex>
        <Flex align='center' p='20px' gap={3} color='#d6c5c7' _hover={{ 
          bgColor: '#2d2d32', cursor: 'pointer' }}>
          <Icon as={BsFillBarChartFill} boxSize='1.4rem' />
          <Heading size='sm'>Metrics</Heading>
        </Flex>
        <Flex align='center' p='20px' gap={3} color='#d6c5c7' _hover={{ 
          bgColor: '#2d2d32', cursor: 'pointer' }}>
          <Icon as={BsFillPlayBtnFill} boxSize='1.4rem' />
          <Heading size='sm'>Playground</Heading>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Sidebar;