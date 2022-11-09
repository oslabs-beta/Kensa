import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { ThemeContext } from './App';

// const CodeEditor = ({ setResData, query, setQuery }: any) => {
type CodeEditorProps = {
  setResData: React.Dispatch<React.SetStateAction<string>>;
  selectedProjectId: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
}

const CodeEditor = ({ setResData, selectedProjectId, query, setQuery  }: CodeEditorProps) => {
  const { theme } = useContext(ThemeContext);
  // const [query, setQuery] = useState<string>('');

  const [invalidQueryMessage, setInvalidQueryMessage] = useState<string>('');

  const GET_PROJECT = gql`
    query GetProject($projectId: ID!) {
      project(id: $projectId) {
        server_url
      }
    }
  `;

  // const GET_RESOLVERS = gql`
    
  // `;

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      projectId: selectedProjectId
    }
  });

  const handleEditorChange = (value?: string, event?: editor.IModelContentChangedEvent): void => {
    let i = 6;

    while(value[i] === ' ' && i < value.length){
      i++;
    }

    if(value[i] === '{') value = `${value.slice(0,6)}DefaultName ${value.slice(i)}`;
    setQuery(value);
  };

  const handleQuerySubmit = () => {
    let serverUrl = data.project.server_url;
    // Attach http to URL if it doesn't have it
    if (!serverUrl.startsWith('http://')) {
      serverUrl = `http://${serverUrl}`;
    }

    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Devmode': 'true'
      },
      body: JSON.stringify({
        query: query
      })
    }).then(res => {
      if (res.status !== 200) {
        setInvalidQueryMessage('Invalid query. Please resubmit');
        throw new Error('Invalid query'); 
      }
      return res.json();
    })
      .then(responseData => {
        setInvalidQueryMessage('');
        setResData(JSON.stringify(responseData.data, null, 2));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const operationName = query.slice(query.indexOf(' '), query.indexOf('{'));

  return (
    <Box id='code-editor' position='relative' pt='13px'>
      <Flex direction='row' alignItems='center' gap={5} marginBottom='20px'>
        <Heading size='sm'>Operation</Heading>
        <Button justifyContent='center'  h='30px' fontSize='0.8rem' colorScheme='facebook' color='white' onClick={handleQuerySubmit}>
          <BsFillPlayFill fontSize='1rem' />
          <Box marginLeft='5px'>{operationName.length > 0 ? operationName : 'Run'}</Box>
        </Button>
        {invalidQueryMessage && (
          <Center id='playground-error-message'>{invalidQueryMessage}</Center>
        )} 
      </Flex>
      <Box className='playground-items'>
        <Editor 
          onChange={handleEditorChange} 
          height='250px'
          width='500px' 
          theme={theme === 'dark' ? 'vs-dark' : ''}
          defaultLanguage='graphql'
          defaultValue='// type your query here'
        />
      </Box>
    </Box>
  );
};

export default CodeEditor;