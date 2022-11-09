import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Stack, Heading, Select, Box, Flex, TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryLogDev from "./HistoryLogDev";
import CodeEditor from "./CodeEditor";
import PlaygroudQueryResponse from "./PlaygroudQueryResponse";
import PlaygroundTreeVis from './PlaygroundTreeVis';
import { ProjectType } from "../types/types";


const PlaygroundContainer = () => {
  const [resData, setResData] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [operationId, setOperationId] = useState<any>('');
  const user = JSON.parse(localStorage.getItem('user'));

  const GET_USER_PROJECT = gql`
    query GetUserProject($userName: String!) {
      username(username: $userName) {
        username
        projects {
          id
          project_name
          server_url
        }
      }
    }
  `;

  const { error, data, loading } = useQuery(GET_USER_PROJECT, {
    variables: {
      userName: user.username
    }
  });

  if (loading) {
    return (
      <Center w='100%' h='100%'>
        <Spinner size='xl' className='spinner'/>
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

  const projects: ProjectType[] = data.username.projects;
  
  return (
    <Stack direction='column' p='20px' id='playground-container'>
      <Flex direction='row' justifyContent='space-between'>
        <Heading size='md' marginBottom={1}>Development Playground</Heading>
        <Select
          w='300px' 
          placeholder='Select Project' 
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          {projects.map((project: ProjectType) => {
            return (
              <option key={project.id} value={project.id}>{project.project_name}</option>
            );
          })}
        </Select>
      </Flex>
      <Flex direction='row' id='playground'>
        <Flex direction='column' gap={0} id='playground-left'>
          <Box>
            <Heading size='sm'>Operation</Heading>
            <Box className='playground-items'>
              <CodeEditor 
                setResData={setResData} 
                selectedProjectId={selectedProjectId} 
                query={query} 
                setQuery={setQuery}
              />
            </Box>
          </Box>
          <Box>
            <Heading size='sm'>Response</Heading>
            <Box className='playground-items'>
              <PlaygroudQueryResponse resData={resData} />
            </Box>
          </Box>
        </Flex>

        <Flex id='plaground-right' w='100%'>
          <Tabs w='100%'>
            <TabList>
              <Tab fontWeight='bold'>Logs</Tab>
              <Tab fontWeight='bold'>Query Visualizer</Tab>
            </TabList>

            <TabPanels w='100%' h='100%'>
              <TabPanel h='100%'>
                <HistoryLogDev selectedProjectId={selectedProjectId}/>
              </TabPanel>
              <TabPanel>
                <PlaygroundTreeVis resData={resData} query={query}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        
      </Flex>
    </Stack>
  );
};

export default PlaygroundContainer;