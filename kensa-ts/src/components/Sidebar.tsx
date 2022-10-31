import React from 'react';
import { Box, Flex, Heading, Stack, Icon, Divider, Image } from '@chakra-ui/react';
import { BsFillBarChartFill, BsFillFolderFill, BsFillPlayBtnFill } from 'react-icons/bs';
// import { MdSpaceDashboard } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


const Sidebar = () => {
  const navigate = useNavigate();

  const toPreviousProject = (): void => {
    const projectId = Cookies.get('projectId');
    navigate(`monitor/${projectId}`);
  };

  return (
    <Box flex='1' id='side-bar'>
      <Flex h='180px' justify='center' align='center' id='logo'>
        <Image src='https://i.postimg.cc/mrWhhZG6/kensa.png' h='150px' w='200px'/>
      </Flex>
      <Stack spacing={3} direction='column' marginTop={10}>
        {/* <Flex align='center' p='20px' gap={3} color='#d6c5c7' _hover={{ 
          bgColor: '#2d2d32', cursor: 'pointer' }}>
          <Icon as={MdSpaceDashboard} boxSize='1.4rem'/>
          <Heading size='sm'>Dashboard</Heading>
        </Flex> */}
        <Flex align='center' p='20px' gap={3} className='sidebar-text'>
          <Icon as={BsFillFolderFill} />
          <Link to=''><Heading size='sm'>Projects</Heading></Link>
        </Flex>
        <Flex align='center' p='20px' gap={3} className='sidebar-text'>
          <Icon as={BsFillBarChartFill} boxSize='1.4rem' />
          <Heading size='sm' onClick={toPreviousProject}>Metrics</Heading>
        </Flex>
        <Flex align='center' p='20px' gap={3} className='sidebar-text'>
          <Icon as={BsFillPlayBtnFill} boxSize='1.4rem' />
          <Heading size='sm'>Playground</Heading>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Sidebar;