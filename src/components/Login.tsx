import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Stack, Heading, Text, Box, Center, FormErrorMessage, Image } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { ThemeContext } from './App';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import logo from '../assets/Kensa-cropped2.png';

const Login = () => {
  // App theme state and function to toggle between themes
  const { theme, toggleTheme } = useContext(ThemeContext);

  // state for all form fields (username, password, password error message)
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();  
  
  // Focus Username input upon rendering  
  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Functions to handle username/password input change
  const handleUserChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  // login function that send username and psw to server (/login)
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('https://kensats.link/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://kensats.link/*',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => {
        // Set password error message in state to display to user
        if (res.status === 400) {
          setIsPasswordError(true);
          throw new Error('Wrong username or password'); 
        }
        return res.json();
      })
      .then((user) => {
        // dispatch login action to Redux store to log user in
        dispatch(login(user));  
        // save global state user in localStorage to persist user on refresh
        localStorage.setItem('user', JSON.stringify(user));
        // Navigate to Projects after successfully login
        navigate(`/user/${username}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box id='login'>
      <form onSubmit={handleLogin}>
        <Link to='/'>
          <Center marginBottom='15px'>
            <Image src={logo} alt='Kensa logo' h='80px' w='150px'/>
          </Center>
        </Link>
        <Stack spacing={10} direction='column' align='center' maxWidth={400}>
          <Heading>Sign In</Heading>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' onChange={handleUserChange} ref={usernameRef} />
          </FormControl>
          <FormControl isRequired isInvalid={isPasswordError}>
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={handlePasswordChange}/>
            <FormErrorMessage>Wrong username or password</FormErrorMessage>
          </FormControl>
          <Button type='submit' w={400} colorScheme='facebook'>Sign In</Button>
          <Link to='/signup'><Text color='blue.500' className='link'>Don&#39;t have account? Get started</Text></Link>
        </Stack>
      </form>
      {/* Button to toggle light/dark mode */}
      <Center>
        <Button size='sm' mt='20px' onClick={toggleTheme} id='toggle-switch'>{theme === 'light' ? 'Dark mode' : 'Light mode'}</Button>
      </Center>
    </Box>
  );
};

export default Login;