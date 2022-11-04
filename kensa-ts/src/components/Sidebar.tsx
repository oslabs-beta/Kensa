import React from 'react';
import { Box, Flex, Heading, Stack, Icon, Image } from '@chakra-ui/react';
import { BsFillBarChartFill, BsFillFolderFill, BsFillPlayBtnFill } from 'react-icons/bs';
// import { MdSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../assets/Kensa cropped2.png';

const Sidebar = () => {
  const projectId = Cookies.get('projectId');

  return (
    <Box flex='1' id='side-bar'>
      <Flex h='180px' justify='center' align='center' id='logo'>
        <Link to='/'><Image src={logo} h='100px' w='150px'/></Link>
      </Flex>
      <Stack spacing={3} direction='column' marginTop={10}>
        {/* <Flex align='center' p='20px' gap={3} color='#d6c5c7' _hover={{ 
          bgColor: '#2d2d32', cursor: 'pointer' }}>
          <Icon as={MdSpaceDashboard} boxSize='1.4rem'/>
          <Heading size='sm'>Dashboard</Heading>
        </Flex> */}
        <Link to=''>
          <Flex align='center' p='20px' gap={3} className='sidebar-text'>
            <Icon as={BsFillFolderFill} />
            <Heading size='sm'>Projects</Heading>
          </Flex>
        </Link>
        <Link to={`monitor/${projectId}`}>
          <Flex align='center' p='20px' gap={3} className='sidebar-text'>
            <Icon as={BsFillBarChartFill} boxSize='1.4rem' />
            <Heading size='sm'>Metrics</Heading>
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