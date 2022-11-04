import React, { useContext } from 'react';
import { Stack, InputGroup, InputLeftElement, Input, Avatar, Icon, Heading, Center, Button } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './App';
import { BsSun, BsMoon } from 'react-icons/bs';
import { darkTheme } from '../theme/darkTheme';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logout } from '../features/auth/authSlice';

const themeHover = {
  cursor: 'pointer',
  bgColor: '#b3cccc',
  borderRadius: '10px',
};

const KensaNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Global state user 
  const user = useSelector((state: RootState) => state.auth.user);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Stack direction='row' spacing={3} bgColor='white' h='8%' w='100%' align='center' p='20px' id='kensa-navbar'>
      <InputGroup>
        <InputLeftElement 
          pointerEvents='none'
          // eslint-disable-next-line react/no-children-prop
          children={<Icon as={BsSearch} id='search-icon'/>}
        />
        <Input type='text' placeholder='Search' />
      </InputGroup>

      <Center onClick={toggleTheme} w='40px' h='40px' _hover={themeHover}>
        {theme === 'light' ? <BsSun /> : <BsMoon color='white'/>}
      </Center>

      {/* Displpay username and logout button when click on Avatar */}
      <Popover placement='bottom-end'>
        <PopoverTrigger>
          <Avatar name={user.username} size='md' justifyItems='flex-end' _hover={{ cursor: 'pointer' }} />
        </PopoverTrigger>
        <PopoverContent w='200px' style={theme === 'dark' && darkTheme}>
          <PopoverArrow />
          <PopoverHeader><Heading size='xs'>{user.username}</Heading></PopoverHeader>
          <PopoverBody>
            <Button onClick={() => {
              dispatch(logout());
              localStorage.removeItem('user');
              navigate('/login');
            }}> Sign out</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default KensaNavbar;