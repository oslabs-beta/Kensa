import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Stack, border } from '@chakra-ui/react';
import { ThemeContext } from "./App";
import { darkTheme } from '../theme/darkTheme';

type AddProjectType = {
    isOpen: boolean;
    onClose: () => void;
}

const AddProject = ({ isOpen, onClose }: AddProjectType) => {
  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const params = useParams();

  const GET_PROJECT_DATA = gql`
    query GetUser($userName: String!) {
      username(username: $userName) {
        id
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PROJECT_DATA, {
    variables: {
      userName: params.username
    }
  });

  const toMonitorPage = (projectId: number): void => {
    const path = `monitor/${projectId}`;
    navigate(path);
  };
    
  // const backToUserPage = (): void => {
  //   const path = `../user/${params.username}`;
  //   navigate(path);
  // };

  // this mutation string creates a new project in Kensa's database
  const ADD_PROJECT = gql`
    mutation AddProject($projectName: String!, $apiKey: String!, $serverUrl: String!, $user: String!) {
      addProject(project_name: $projectName, api_key: $apiKey, server_url: $serverUrl, user: $user) {
        id
        project_name
      }
    }
`;
        
  // custom hook for creating new project using the ADD_PROJECT mustation string above
  const [addProject, { data: mutationData }] = useMutation(ADD_PROJECT, {
    onCompleted: () => {
      const projectId = mutationData.addProject.id;
      toMonitorPage(Number(projectId));
    }
  });

  const handleCreateProjectForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  
    const apiKey: string = uuidv4(); // create new api key (32 characters of alpha and numerics)
    const userId = data.username.id;
    addProject({
      variables: { 
        projectName: projectName, 
        apiKey: apiKey, 
        serverUrl: projectUrl, 
        user: userId 
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent id='add-project-modal' style={theme === 'dark' && darkTheme}>
        <ModalHeader>Add New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody  >
          <form onSubmit={handleCreateProjectForm}  >
            <Stack spacing={10} direction='column' >
              <FormControl isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input type='text' onChange={(e: React.SyntheticEvent): void => {
                  const target = e.target as HTMLInputElement;
                  setProjectName(target.value);
                }}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Default URL</FormLabel>
                <Input type='text' onChange={(e: React.SyntheticEvent): void => {
                  const target = e.target as HTMLInputElement;
                  setProjectUrl(target.value);
                }}/>
              </FormControl>
              <Stack direction='row' justify='end'>
                <Button 
                  color={theme === 'dark' ? 'black' : 'white'} 
                  colorScheme={theme === 'light' ? 'facebook' : 'gray'} 
                  mr={3} 
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button 
                  type='submit' 
                  color={theme === 'dark' ? 'black' : 'white'} 
                  colorScheme={theme === 'light' ? 'facebook' : 'gray'}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProject;