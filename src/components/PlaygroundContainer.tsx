import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Stack, Heading, Select, Flex, TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryLogDev from "./HistoryLogDev";
import CodeEditor from "./CodeEditor";
import PlaygroudQueryResponse from "./PlaygroudQueryResponse";
import PlaygroundTreeVis from './PlaygroundTreeVis';
import { ProjectType } from "../types/types";


const PlaygroundContainer = () => {
  // State for response data received after query is submitted
  const [resData, setResData] = useState<string>('');
  // State for query submitted in CodeEditor component
  const [query, setQuery] = useState<string>('');
  // State for current selected project from drop down menu
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Get username from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // GraphQL mutation string to get all user's projects to populate in drop down menu
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
      {/* Display all user's projects in drop down */}
      <Flex direction='row' justifyContent='space-between'>
        <Heading size='md' marginBottom={1}>Development Playground</Heading>
        <Select
          w='400px' 
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
      {/* Main playground where CodeEditor and PlaygroudQueryResponse are on the left
      Log and Query Visualizer tabs are on the right */}
      <Flex direction='row' id='playground'>
        <Flex direction='column' gap='40px' id='playground-left'>
          <CodeEditor 
            setResData={setResData} 
            selectedProjectId={selectedProjectId} 
            query={query} 
            setQuery={setQuery}
          />
          <PlaygroudQueryResponse resData={resData} />
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