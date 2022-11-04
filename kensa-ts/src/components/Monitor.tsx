import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import MetricContainer from "./MetricContainer";
import ProjectInfo from './ProjectInfo';
import { Box, Center, Spinner, Alert, AlertIcon, Stack, Heading, Icon, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { TbRefresh } from 'react-icons/tb';
import { ThemeContext } from './App';
import { darkTheme } from '../theme/darkTheme';

const Monitor = () => {
  const { theme } = useContext(ThemeContext);

  const currentProjectId = localStorage.getItem('projectId');

  // Alert user when they click on Metrics tab if they haven't clicked on a project yet
  if (!currentProjectId) {
    return (
      <Center w='100%' h='100%' >
        <Alert status='error' h='100px' w='50%' borderRadius='10px' className='alert'>
          <AlertIcon />
          Please choose a project 
        </Alert>
      </Center>
    );
  }

  // Refetch last seen project data when user click back to the Metrics Tab on the sidebar
  useEffect(() => {
    refetch({ projectId: currentProjectId });
  }, []);

  const GET_PROJECT_DATA = gql`
    query GetProjectData($projectId: ID!) {
      project(id: $projectId) {
        project_name
        server_url
        api_key
        user {
          username
        }
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
      projectId: currentProjectId
    },
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
      <Stack spacing={4} direction='row' align='center' marginBottom='25px'>
        <Link to={`/user/${data.project.user.username}`}><Icon as={BsFillArrowLeftCircleFill} fontSize='1.3rem'/></Link>
        <Heading size='md'>Project Name: {data.project['project_name']}</Heading>
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
            <PopoverBody><ProjectInfo projectId={currentProjectId} apiKey={data.project['api_key']} /></PopoverBody>
          </PopoverContent>
        </Popover>
        {/* Refresh to fetch current project newest data  */}
        <Box onClick={() => refetch({ projectId: currentProjectId })} _hover={{ cursor: 'pointer' }} fontSize='1.5rem'><TbRefresh /></Box>
      </Stack>
      <MetricContainer historyLogs={data.project['history_log']}/>
    </Stack>
  );
};

export default Monitor;