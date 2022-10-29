import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";


const Signup = () => {

  return (
    <form>
      <Stack spacing={4} direction='column' align='center' maxWidth={400}>
        <Heading>Register</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' />
        </FormControl>
        <Stack spacing={4} direction='row' align='center'>
          <Button type='submit' w={190} colorScheme='facebook'>Submit</Button>
          <Button w={190} colorScheme='facebook'>Cancel</Button>
        </Stack>
      </Stack>
    </form>
  );
};

// const Signup = () => {
//   let navigate = useNavigate();

//   const useAuth = ():boolean => {
//     // for now this auth function will only check if the username and password are empty
//     const username = document.getElementsByName("username")[0] as HTMLInputElement | null;
//     const password = document.getElementsByName("password")[0] as HTMLInputElement | null;
//     if (username.value && password.value) {
//       return true;
//     }
//     return false;
//   };

//   const toUserPage = ():void => {
//     let auth = useAuth();
//     if (auth) {
//       const path = '../user';
//       navigate(path);
//     }
//   };

//   return (
//     <div className="secondary-container">
//       <h2>Sign Up</h2>
//       <form id="signup-form" onSubmit={(e: React.FormEvent<HTMLFormElement>):void => {
//         e.preventDefault();
//         toUserPage();
//       }}>
//         <input type="text" name="username" placeholder="username"/>
//         <input type="password" name="password" placeholder="password"/>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

export default Signup;