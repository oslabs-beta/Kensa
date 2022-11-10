import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Stack, Heading, Center, Box, FormErrorMessage, Spinner, Image } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { ThemeContext } from "./App";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import logo from '../assets/Kensa-cropped2.png';


const Signup = () => {
  // App theme state and function to switch between themes
  const { theme, toggleTheme } = useContext(ThemeContext);

  // state for all form fields (username, password, confirm password)
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux action dispatcher
  
  // used to set up error message if username is taken
  let isUserNameError = false;
  // used to set up error message if passwords do not match
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  // Focus Username input upon rendering  
  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Getting user state in localStorage. If there is a user, log them in and navigate to user's Projects page
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user) {
      dispatch(login(user));
      navigate(`/user/${user.username}`);
    }
  }, [user]);

  // Functions to handle username/password/confirm password input change
  const handleUserChange = (e: React.SyntheticEvent): void  => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  const handleConfirmPasswordChange = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setConfirmPassword(target.value);
  };

  const getUserInfo = () => {
    return { user: username, pw: password };
  };

  // GraphQL mutation string to create a user
  const CREATE_USER = gql`
  mutation CreateUser ($username: String!, $password: String!){
    createUser(username: $username, password: $password) {
        username
        token
    }
  }
`;

  // GraphQL mutation to create user. Upon completion, dispatch action to Redux store
  // to login user
  const [createUser, {data, loading, error}]  = useMutation(CREATE_USER, {
    onCompleted: () => {
      const user = {
        username: data.createUser.username,
        token: data.createUser.token
      };

      dispatch(login(user));

      // save user info into localStorage
      // and navigate user to their main Projects page
      localStorage.setItem('user', JSON.stringify(user));
      navigate(`/user/${username}`);
    }
  });

  // Render spinner when loading GraphQL mutation
  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl' className='spinner'/>
      </Center>
    );
  }

  // If there is an error in GraphQL request like username is already taken
  // set isUsernameError = true to give error message
  if (error) {
    isUserNameError = true;
  }

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { user, pw } = getUserInfo();
    if (password !== confirmPassword) {
      setIsPasswordError(true);
      return;
    }

    setIsPasswordError(false);
    // GraphQL mutation to create user
    createUser({variables: { username: user, password: pw }});
  };

  return (
    <Box id='signup'>
      <form id="add-project-form" onSubmit={handleSignUp}>
        <Link to='/'>
          <Center marginBottom='15px'>
            <Image src={logo} alt='Kensa logo' h='80px' w='150px'/>
          </Center>
        </Link>
        <Stack spacing={10} direction='column' align='center' maxWidth={400}>
          <Heading>Register</Heading>
          <FormControl isRequired isInvalid={isUserNameError}>
            <FormLabel>Username</FormLabel>
            <Input type='text' onChange={handleUserChange} ref={usernameRef}/>
            <FormErrorMessage>That username is taken. Try another</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={handlePasswordChange}/>
          </FormControl>
          <FormControl isRequired isInvalid={isPasswordError}>
            <FormLabel>Confirm Password</FormLabel>
            <Input type='password' onChange={handleConfirmPasswordChange}/>
            <FormErrorMessage>Passwords do not match</FormErrorMessage>
          </FormControl>
          <Button type='submit' w={400} colorScheme='facebook'>JOIN</Button>
          <Link to='/login'><Text align='right' color='blue.500' _hover={{ color: 'blue' }}>Already have account? Sign in</Text></Link>
        </Stack>
      </form>
      {/* Button to toggle light/dark mode */}
      <Center>
        <Button size='sm' mt='20px' onClick={toggleTheme} id='toggle-switch'>{theme === 'light' ? 'Dark mode' : 'Light mode'}</Button>
      </Center>
    </Box>
  );
};
    
export default Signup;
