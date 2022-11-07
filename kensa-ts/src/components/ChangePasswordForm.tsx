import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Heading, Center, Box, FormErrorMessage, Spinner, Flex } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


const ChangePasswordForm = () => {
  // Get the username from Redux global state
  const user = useSelector((state: RootState) => state.auth.user);
  const username = user.username;

  // const [username, setUsername] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const navigate = useNavigate();

  // used to set up error message if old password is incorrect
  let isOldPasswordError = false;
  // used to set up error message if new passwords do not match
  const [isNewPasswordError, setIsNewPasswordError] = useState<boolean>(false);

  // Focus old password input upon rendering  
  const oldPasswordRef = useRef(null);
  useEffect(() => {
    oldPasswordRef.current.focus();
  }, []);


  const CHANGE_PASSWORD = gql`
    mutation ChangePassword ($userInput: ChangePasswordInput!) {
      changePassword(userInput: $userInput) {
        id
        username
      }
    }
  `;

  // GraphQL mutation function to change password
  const [changePassword, { data, loading, error }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      navigate(`/user/${data.changePassword.username}`);
    }
  });

  // Render spinner when loading GraphQL mutation
  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl' />
      </Center>
    );
  }

  // If there is an error in GraphQL request like old password is incorrect
  // set isOldPasswordError = true to give error message
  if (error) {
    isOldPasswordError = true;
  }

  const handleChangePassword = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setIsNewPasswordError(true);
      return;
    }
    setIsNewPasswordError(false);
    // GraphQL mutation to change password
    changePassword({
      variables: {
        userInput: {
          username,
          oldPassword,
          newPassword
        }
      }
    });
  };

  return (
    <Flex align='center' justifyContent='center' marginTop='50px' id='change-password-form'>
      <form onSubmit={handleChangePassword}>
        <Stack spacing={10} direction='column' align='center' maxWidth={400}>
          <Heading>Change Password</Heading>
          <FormControl isRequired isInvalid={isOldPasswordError}>
            <FormLabel>Old password</FormLabel>
            <Input 
              type='password' 
              onChange={(e) => setOldPassword(e.target.value)} 
              ref={oldPasswordRef}
            />
            <FormErrorMessage>Password is incorrect</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>New password</FormLabel>
            <Input 
              type='password' 
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired isInvalid={isNewPasswordError}>
            <FormLabel>Confirm new password</FormLabel>
            <Input 
              type='password' 
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <FormErrorMessage>Passwords do not match</FormErrorMessage>
          </FormControl>
          <Button type='submit' w={400} colorScheme='facebook'>Update password</Button>
        </Stack>
      </form>
    </Flex>
  );
};
    
export default ChangePasswordForm;
