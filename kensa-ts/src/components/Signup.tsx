import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Heading, Center, Box } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./App";
import { useQuery, useMutation, gql } from "@apollo/client";
import Cookies from 'js-cookie';

type SignUpProps = {
  // verifyjwt: ()=> void,
}

const Signup = (props: SignUpProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const { verifyjwt } = props;
  const navigate = useNavigate();

  const CREATE_USER = gql`
    mutation CreateUser ($username: String!, $password: String!){
      createUser(username: $username, password: $password) {
          id
      }
    }
  `;

  function toProjectPage(username:string): void {
    const path = `../user/${username}`;
    navigate(path);
  }

  function handleUserChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  function handlePasswordChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  function handleConfirmPasswordChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setConfirmPassword(target.value);
  }

  const getUserInfo = () => {
    return {user: username, pw: password};
  };
  const [ createUser, {data, loading, error} ]  = useMutation(CREATE_USER, {
    onCompleted: () => {
      if(error) alert('wrong login');
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
            Cookies.set('username', username);
            console.log('cookies set in login',Cookies.get('token'));
            // verifyjwt();
            toProjectPage(username);
          }else {
            alert("Wrong login credentials.");
          }
        });
    }
  });

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box id='signup'>
      <form id="add-project-form" onSubmit={(e: React.SyntheticEvent):void => {
        e.preventDefault();
        const {user, pw} = getUserInfo();
        if(password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        createUser({variables: {username: user, password: pw}});
      }}>
        <Stack spacing={10} direction='column' align='center' maxWidth={400}>
          <Heading>Register</Heading>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' onChange={handleUserChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={handlePasswordChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type='password' onChange={handleConfirmPasswordChange}/>
          </FormControl>
          <Button type='submit' w={400} colorScheme='facebook'>JOIN</Button>
          {/* <Button w={190} colorScheme='facebook'>Cancel</Button> */}
          <Link to='/login'><Text align='right' color='blue.500' _hover={{ color: 'blue' }}>Already have account? Sign in</Text></Link>
        </Stack>
      </form>
      <Center>
        <Button size='sm' mt='20px' onClick={toggleTheme} id='toggle-switch'>{theme === 'light' ? 'Dark mode' : 'Light mode'}</Button>
      </Center>
    </Box>
  );
};
    
export default Signup;
