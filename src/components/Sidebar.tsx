import React from 'react';
import { Box, Flex, Heading, Stack, Icon, Image } from '@chakra-ui/react';
import { BsFillFolderFill, BsFillPlayBtnFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../assets/Kensa-cropped2.png';

const Sidebar = () => {

  return (
    <Box flex='1' id='side-bar'>
      <Flex h='180px' justify='center' align='center' id='logo'>
        <a href='http://localhost:3006/'><Image src={logo} h='80px' w='150px'/></a>
      </Flex>
      <Stack spacing={3} direction='column' marginTop={10}>
        <Link to=''>
          <Flex align='center' p='20px' gap={3} className='sidebar-text'>
            <Icon as={BsFillFolderFill} />
            <Heading size='sm'>Projects</Heading>
          </Flex>
        </Link>
        <Link to='playground'>
          <Flex align='center' p='20px' gap={3} className='sidebar-text'>
            <Icon as={BsFillPlayBtnFill} boxSize='1.4rem' />
            <Heading size='sm'>Playground</Heading>
          </Flex>
        </Link>
      </Stack>
    </Box>
  );
};

export default Sidebar;