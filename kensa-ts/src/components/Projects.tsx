import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Cookies from 'js-cookie';
import ProjectCard from "./ProjectCard";
import { Spinner, Alert, AlertIcon, Button, Heading, Box, Flex, Spacer, Center } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AddProject from "./AddProject";

const Projects = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  // logic check - check for token, make sure they have the token with decode
  const token = Cookies.get('token');
  const userInCookie = Cookies.get('username');
  console.log('username in projects ', username, userInCookie);
  if (!token || userInCookie !== username) {
    return (
      <Center w='100%' h='100%'>
        <Alert status='error' h='100px' w='50%' borderRadius='10px'>
          <AlertIcon />
          Please login. You do not have access to this page
        </Alert>
      </Center>
    );
  }

  // Chakra Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
    
  const toAddProjectPage = ():void => {
    const path = 'new';
    navigate(path);
  };

  const GET_USER_PROJECT = gql`
    query GetUserProject {
      username(username: "${username}") {
        username
        projects {
          id
          project_name
          api_key       
        }
      }
    }
  `;

  const { error, data, loading } = useQuery(GET_USER_PROJECT);
  
  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl' />
      </Center>
    );
  }

  if (error) {
    return (
      <Center w='100%' h='100%'>
        <Alert status='error' h='100px' w='50%' borderRadius='10px'>
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Center>
    );
  }

  const projects = data.username.projects;
  const projectCards: Array<any> = [];

  for (let i = 0; i < projects.length; i++) {
    const projectName = projects[i]["project_name"];
    const projectId = projects[i]["id"];
    const apiKey = projects[i]["api_key"];

    projectCards.push(
      <ProjectCard projectName={projectName} apiKey={apiKey} projectId={projectId} />
      // <GridItem key={i}>
      //   <ProjectCard projectName={projectName} apiKey={apiKey} projectId={projectId} />
      // </GridItem>
    );
  }

  return (
    <Box w='100%' h='100%'>
      <Flex m={5} align='center' justify='flex-end'>
        <Heading>Welcome back, {data.username.username}</Heading>
        <Spacer />
        {/* Add Project Button */}
        <Button onClick={onOpen} colorScheme='facebook'>New Project</Button>
      </Flex>
      <AddProject isOpen={isOpen} onClose={onClose} />
      
      {/* Display Projects */}
      <Flex gap={5} m={5} direction='column'>
        {projectCards}
      </Flex>
      {/* <Grid templateColumns='repeat(4, 1fr)' gap={5} m={5}>
        {projectCards}
      </Grid>      */}
    </Box>
  );
};

export default Projects;