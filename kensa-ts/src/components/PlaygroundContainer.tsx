import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, GridItem, Stack, Heading, Text, Select, Box } from '@chakra-ui/react';
import { Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryLogDev from "./HistoryLogDev";
import CodeEditor from "./CodeEditor";
import PlaygroudQueryResponse from "./PlaygroudQueryResponse";
import PlaygroundTreeVis from './PlaygroundTreeVis';
import { ProjectType } from "../types/types";


const PlaygroundContainer = () => {
  const [resData, setResData] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

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
        <Spinner size='xl' />
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
      <Stack>
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
      </Stack>
      <Grid id='playground'>
        <GridItem >
          <Heading size='sm'>Operation</Heading>
          <Box className='playground-items'>
            <CodeEditor 
              setResData={setResData} 
              selectedProjectId={selectedProjectId} 
            />
          </Box>
        </GridItem>
        <GridItem>
          <Heading size='sm'>Tree Structure</Heading>
          <Box className='playground-items'>
            <PlaygroundTreeVis />
          </Box>
        </GridItem>
        <GridItem>
          <Heading size='sm'>Response</Heading>
          <Box className='playground-items'>
            <PlaygroudQueryResponse resData={resData} />
          </Box>
        </GridItem>
        <GridItem>
          <Heading size='sm'>History Log</Heading>
          <Box className='playground-items' id='history-log-dev'>
            <HistoryLogDev selectedProjectId={selectedProjectId}/>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default PlaygroundContainer;