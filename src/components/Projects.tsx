import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Spinner, Alert, AlertIcon, Button, Heading, Box, Flex, Spacer, Center, Grid, GridItem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import AddProject from "./AddProject";

import { useDispatch } from 'react-redux';
import { updateCurrentProjectId } from "../features/auth/authSlice";
import { ThemeContext } from "./App";
import { ProjectType } from "../types/types";


const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  // params username in URL route
  const { username } = useParams();
  
  // Log user in if they are already signed in
  const user = JSON.parse(localStorage.getItem('user'));

  // Prevent user from accessing Project by modifying URL params
  if (!user || username !== user.username) {
    return (
      <Center w='100%' h='100%' >
        <Alert status='error' h='100px' w='50%' borderRadius='10px' className='alert'>
          <AlertIcon />
          Please login. You do not have access to this page
        </Alert>
      </Center>
    );
  }

  // Chakra Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // GraphQL query string to get all user's projects
  const GET_USER_PROJECT = gql`
    query GetUserProject($userName: String!) {
      username(username: $userName) {
        id
        username
        projects {
          id
          project_name
          api_key       
        }
      }
    }
  `;

  const { error, data, loading } = useQuery(GET_USER_PROJECT, {
    variables: {
      userName: user.username
    }, 
    // by default, useQuery hook check Apollo Client cache to see if it is available locally. This is needed to make sure we have newly updated project rendered after adding a project
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });

  // Render spinner during loading state
  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl' className='spinner'/>
      </Center>
    );
  }

  // Render error message if there is an error with the request
  if (error) {
    return (
      <Center w='100%' h='100%'>
        <Alert status='error' h='100px' w='50%' borderRadius='10px' className='alert'>
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Center>
    );
  }

  // Get projects from data to display 
  const projects: ProjectType[] = data.username.projects;
  const projectCards: Array<any> = [];

  for (let i = 0; i < projects.length; i++) {
    const projectName = projects[i]["project_name"];
    const projectId = projects[i]["id"];

    projectCards.push(
      <GridItem key={i} className='projects-grid-item' onClick={() => {
        // dispatch action to update currentProject in Redux store
        dispatch(updateCurrentProjectId(projectId)); 
        // save projectId to localStorage to persist data when refreshing
        localStorage.setItem('projectId', projectId); 
      }}>
        <ProjectCard projectName={projectName} projectId={projectId}  />
      </GridItem>
    );
  }

  return (
    <Box w='100%' h='100%' p={5}>
      <Flex align='center' justify='flex-end' marginBottom='30px'>
        <Heading id='welcome' >Welcome back, {data.username.username}</Heading>
        <Spacer />
        {/* Add Project Button */}
        <Button 
          onClick={onOpen} 
          colorScheme={theme === 'light' ? 'facebook' : 'gray'}
        >
          New Project
        </Button>
      </Flex>
      <AddProject isOpen={isOpen} onClose={onClose} userId={data.username.id} />
      
      {/* Display Projects */}
      <Grid id='projects-grid-container'>
        {projectCards}
      </Grid>     
    </Box>
  );
};

export default Projects;