import React, { useContext } from 'react';
import { Avatar, Heading, Center, Button, Flex, Box, Text } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from './App';
import { BsSun, BsMoon } from 'react-icons/bs';
import { darkTheme } from '../theme/darkTheme';

import { useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';

const themeHover = {
  cursor: 'pointer',
  bgColor: '#b3cccc',
  borderRadius: '10px',
};

const KensaNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get global state user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Flex gap={4} h='8%' w='100%' align='center' justifyContent='flex-end' p='20px' id='kensa-navbar'>
      {/* Toggle App Theme button */}
      <Center onClick={toggleTheme} w='40px' h='40px' _hover={themeHover}>
        {theme === 'light' ? <BsSun /> : <BsMoon color='white'/>}
      </Center>

      {/* Displpay username and logout button when click on Avatar */}
      <Box>
        <Popover placement='bottom-end'>
          <PopoverTrigger>
            <Avatar name={user.username} size='md' justifyItems='flex-end' _hover={{ cursor: 'pointer' }} />
          </PopoverTrigger>
          <PopoverContent w='200px' style={theme === 'dark' && darkTheme}>
            <PopoverArrow />
            <PopoverHeader><Heading size='xs'>{user.username}</Heading></PopoverHeader>
            <PopoverBody>
              <Link to='security'><Box marginBottom='10px'>Change password</Box></Link>
              <Text 
                _hover={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('user');
                  localStorage.removeItem('projectId');
                  navigate('/login');
                }}
                size='sm'
              > 
              Sign out
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Flex>
  );
};

export default KensaNavbar;