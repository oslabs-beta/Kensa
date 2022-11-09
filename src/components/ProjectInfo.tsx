import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { ThemeContext } from "./App";

type ProjectInfoType = {
    projectId: string;
    projectName: string;
    projectURL: string;
    setProjectName: React.Dispatch<React.SetStateAction<string>>;
    setProjectURL: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
}

const ProjectInfo = ({ projectId, projectName, projectURL, setProjectName, setProjectURL, apiKey }: ProjectInfoType) => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const { username } = useParams();

  const [isEditting, setIsEditting] = useState<boolean>(false);

  // GraphQL mutation to delete a project and all its associated history log (production and development) as well as resolvers' log
  const DELETE_PROJECT = gql`
    mutation DeleteHistoryLogs($deleteHistoryLogsId: ID!, 
    $deleteHistoryLogsDevId: ID!, 
    $deleteResolverLogsDevId: ID!, 
    $deleteProjectId: ID!) {
      deleteHistoryLogs(id: $deleteHistoryLogsId) {
        id
      }
      deleteHistoryLogsDev(id: $deleteHistoryLogsDevId) {
        id
      }
      deleteResolverLogsDev(id: $deleteResolverLogsDevId) {
        id
      }
      deleteProject(id: $deleteProjectId) {
        id
        project_name
      }
    }
  `;

  // GraphQL mutation to update project, only project name and URL are allowed to update
  const UPDATE_PROJECT = gql`
    mutation UpdateProject($updateProjectId: ID!, $project: ProjectInput!) {
      updateProject(id: $updateProjectId, project: $project) {
        id
        project_name
        api_key
        server_url
      }
    }
  `;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      navigate(`/user/${username}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => {
      setIsEditting(!isEditting);
    }
  });

  // Function to handle delete and update project, calling GraphQL mutation function
  const handleDeleteProject = () => {
    deleteProject({
      variables: {
        deleteResolverLogsDevId: projectId,
        deleteHistoryLogsDevId: projectId,
        deleteHistoryLogsId: projectId,
        deleteProjectId: projectId
      }
    });
  };

  const handleUpdateProject = () => {
    updateProject({
      variables: {
        updateProjectId: projectId,
        project: {
          project_name: projectName,
          server_url: projectURL
        }
      }
    });
  };

  // Render editing state if isEditting is true
  if (isEditting) {
    return (
      <Flex direction='column' justifyContent='space-between'>
        <Box mb={'5'}>
          <FormControl isRequired mb={5}>
            <FormLabel>Name:</FormLabel>
            <Input 
              type='text' 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mb={5}>
            <FormLabel>URL:</FormLabel>
            <Input 
              type='text' 
              value={projectURL} 
              onChange={(e) => setProjectURL(e.target.value)}
            />
          </FormControl>
          
          <Text><span style={{ fontWeight: 'bold' }}>API:</span> {apiKey}</Text> 
        </Box>
        <Button
          color={theme === 'dark' ? 'black' : 'white'}
          colorScheme={theme === 'light' ? 'facebook' : 'gray'} 
          onClick={handleUpdateProject}
        >
          Save
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction='column' h='200px' justifyContent='space-around'>
      <Box mb={'5'}>
        <Text><span style={{ fontWeight: 'bold' }}>Name:</span> {projectName}</Text> 
        <Text><span style={{ fontWeight: 'bold' }}>URL:</span> {projectURL}</Text> 
        <Text><span style={{ fontWeight: 'bold' }}>API:</span> {apiKey}</Text> 
      </Box>
      <Flex gap={5}>
        <Button
          color={theme === 'dark' ? 'black' : 'white'}
          colorScheme={theme === 'light' ? 'facebook' : 'gray'} 
          onClick={(): void => setIsEditting(!isEditting)}
        >
          Edit
        </Button>
        <Button
          color={theme === 'dark' ? 'black' : 'white'}
          colorScheme={theme === 'light' ? 'facebook' : 'gray'} 
          onClick={handleDeleteProject}>
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProjectInfo;