import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Stack, Heading, Text, Box, Center } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { ThemeContext } from './App';

import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
    
  // Getting user state in localStorage. If there is a user, log them in and navigate to /user/:username
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user) {
      dispatch(login(user));
      navigate(`/user/${user.username}`);     // navigate to user's Projects page
    }
  }, [user]);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  function handleUserChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  function handlePasswordChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  // login function that send username and psw to server (/login)
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/*',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => res.json())
      .then((user) => {
        dispatch(login(user));  // dispatch login action to Redux store
        // save global state user in localStorage to persist user on refresh
        localStorage.setItem('user', JSON.stringify(user));
        // Navigate to Projects after successfully login
        navigate(`/user/${username}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box id='login'>
      <form onSubmit={handleLogin}>
        <Stack spacing={10} direction='column' align='center' maxWidth={400}>
          <Heading>Sign In</Heading>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' onChange={handleUserChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={handlePasswordChange}/>
          </FormControl>
          <Button type='submit' w={400} colorScheme='facebook'>Sign In</Button>
          <Link to='/signup'><Text align='right' color='blue.500' _hover={{ color: 'blue' }}>Don&#39;t have account? Get started</Text></Link>
        </Stack>
      </form>
      <Center>
        <Button size='sm' mt='20px' onClick={toggleTheme} id='toggle-switch'>{theme === 'light' ? 'Dark mode' : 'Light mode'}</Button>
      </Center>
    </Box>
  );
};

export default Login;