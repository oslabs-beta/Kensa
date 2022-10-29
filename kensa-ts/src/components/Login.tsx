import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { verify } from 'jsonwebtoken';
import { Stack, Heading, Text } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

type LoginProps = {
    verifyjwt: ()=> void; 
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

    const link = 'http://localhost:3000/login';

    fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/*',
      },
      //   mode: 'no-cors',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((data) => data.json())
      .then((verified) => {
        console.log(verified);
        if(verified.success) {
          Cookies.set('token', verified.token);
          Cookies.set('username', username)
          console.log('cookies set in login',Cookies.get('token'))
          props.verifyjwt();
          toProjectPage(username);
        }else {
          alert("Wrong login credentials.");
        } 
        
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={4} direction='column' align='center' maxWidth={400}>
        <Heading>Sign In</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' onChange={handleUserChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' onChange={handlePasswordChange}/>
        </FormControl>
        <Stack spacing={4} direction='row' align='center'>
          <Button type='submit' w={190} colorScheme='facebook'>Sign In</Button>
          <Button w={190} colorScheme='facebook'>Cancel</Button>
        </Stack>
        <Link to='/signup'><Text align='right' color='blue.500' _hover={{ color: 'blue' }}>Don&#39;t have account? Register Now</Text></Link>
      </Stack>
    </form>
  );
};

export default Login;