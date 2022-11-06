import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import MetricContainer from "./MetricContainer";
import ProjectInfo from './ProjectInfo';
import { Box, Center, Spinner, Alert, AlertIcon, Stack, Heading, Icon, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Flex } from '@chakra-ui/react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { TbRefresh } from 'react-icons/tb';
import { ThemeContext } from './App';
import { darkTheme } from '../theme/darkTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Monitor = () => {
  const { theme } = useContext(ThemeContext);
  const { username } = useParams();

  const [projectName, setProjectName] = useState<string>('');
  const [projectURL, setProjectURL] = useState<string>('');
  
  let projectId: string;
  const user = useSelector((state: RootState) => state.auth.user);
  
  if (user.currentProjectId !== '0') {
    projectId = user.currentProjectId;
    localStorage.setItem('projectId', projectId);
  } else {
    projectId = localStorage.getItem('projectId');
  }
  
  // Refetch last seen project data when user click back to the Metrics Tab on the sidebar
  useEffect(() => {
    refetch({ projectId: projectId });
  }, []);

  const GET_PROJECT_DATA = gql`
    query GetProjectData($projectId: ID!) {
      project(id: $projectId) {
        project_name
        server_url
        api_key
        history_log {
          id
          operation_name
          query_string
          execution_time
          created_at
          success
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_PROJECT_DATA, {
    variables: {
      projectId: projectId
    },
    onCompleted: () => {
      setProjectName(data.project['project_name']);
      setProjectURL(data.project['server_url']);
    }
    // pollInterval: 10000,  // polling every 10 seconds
  });

  
  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl'/>
      </Center>
    );
  }
  
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

  return (
    <Stack direction='column' p={'20px'} id='monitor'>
      <Flex direction='row' justifyContent='space-between' marginBottom='25px'>
        <Flex gap={2} align='center' marginBottom='10px'>
          <Link to={`/user/${username}`}>
            <Icon as={BsFillArrowLeftCircleFill} fontSize='1.3rem'/>
          </Link>
          <Heading size='md'>Project Name: {projectName}</Heading>
        </Flex>
        <Flex gap={2}>
          <Popover>
            <PopoverTrigger>
              <Button 
                size='xs' 
                color={theme === 'dark' ? 'black' : 'white'} 
                colorScheme={theme === 'light' ? 'facebook' : 'gray'}
              >
              Info
              </Button>
            </PopoverTrigger>
            <PopoverContent style={theme === 'dark' && darkTheme}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader><Heading size='xs'>Project Info</Heading></PopoverHeader>
              <PopoverBody>
                <ProjectInfo 
                  projectId={projectId} 
                  projectName={projectName}
                  setProjectName={setProjectName}
                  projectURL={projectURL}
                  setProjectURL={setProjectURL}
                  apiKey={data.project['api_key']}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* Refresh to fetch current project newest data  */}
          <Box onClick={() => refetch({ projectId: projectId })} _hover={{ cursor: 'pointer' }} fontSize='1.5rem'>
            <TbRefresh />
          </Box>
        </Flex>
      </Flex>
      <MetricContainer historyLogs={data.project['history_log']}/>
    </Stack>
  );
};

export default Monitor;