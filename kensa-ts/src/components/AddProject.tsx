import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { ThemeContext } from "./App";
import { darkTheme } from '../theme/darkTheme';
import { useDispatch } from "react-redux";
import { updateCurrentProjectId } from '../features/auth/authSlice';

type AddProjectType = {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

const AddProject = ({ isOpen, onClose, userId }: AddProjectType) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  const toMonitorPage = (projectId: number): void => {
    const path = `monitor/${projectId}`;
    navigate(path);
  };

  // this mutation string creates a new project in Kensa's database
  const ADD_PROJECT = gql`
    mutation AddProject($project: ProjectInput!) {
      addProject(project: $project) {
        id
        project_name
      }
    }
  `;
        
  // custom hook for creating new project using the ADD_PROJECT mustation string above
  const [addProject, { data: mutationData }] = useMutation(ADD_PROJECT, {
    onCompleted: () => {
      const projectId = mutationData.addProject.id;
      // Dispatch action to Redux store to update currentprojectId state
      dispatch(updateCurrentProjectId(projectId));
      toMonitorPage(Number(projectId));
    }
  });

  const handleCreateProjectForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  
    const apiKey: string = uuidv4(); // create new api key (32 characters of alpha and numerics)
    addProject({
      variables: {
        project: {
          project_name: projectName,
          api_key: apiKey,
          server_url: projectUrl,
          userId: userId
        }
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