import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { verify } from 'jsonwebtoken'; // see comment in MainContainer.tsx
import { Stack, Heading, Text, Box } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

type LoginProps = {
    // verifyjwt: () => void;  // see comment in MainContainer.tsx
    // handleCurrentUserId: (id:(number | null)) => void
} 

const Login = (props: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleUserChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  function handlePasswordChange(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  function toProjectPage(username:string): void {
    const path = `../user/${username}`;
    navigate(path);
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
      .then((verified) => {
        console.log(verified);
        if(verified.success) {
          Cookies.set('token', verified.token);
          Cookies.set('username', username);
          console.log('cookies set in login', Cookies.get('token'));
          // props.verifyjwt(); // see comment in MainContainer.tsx
          // toProjectPage(username); // should redirect user to Kensa.tsx
          navigate(`/user/${username}`);
        } else {
          alert("Wrong login credentials.");
        } 
        
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <Box>
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
    </Box>
  );
};

export default Login;