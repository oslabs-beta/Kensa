import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Box, Button } from '@chakra-ui/react';
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
    if(value[i] === '{') value = `${value.slice(0,6)}defaultName ${value.slice(i)}`;
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    }).then(res => {
      if (res.status === 400) {
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
    <Box id='code-editor' position='relative'>
      <Editor 
        onChange={handleEditorChange} 
        height='280px' 
        theme={theme === 'dark' ? 'vs-dark' : ''}
        defaultLanguage='graphql'
        defaultValue='// type your query here'
      />
      <Button justifyContent='center' position='absolute' top='2px' right='0' w='fit-content' h='30px' fontSize='0.8rem' colorScheme='facebook' color='white'>
        <BsFillPlayFill fontSize='1rem' />
        <Box marginLeft='5px' onClick={handleQuerySubmit}>{operationName.length > 0 ? operationName : 'Run'}</Box>
      </Button>
      {invalidQueryMessage && (
        <Box id='playground-error-message' position='absolute' top='30px' right='20px'>{invalidQueryMessage}</Box>
      )} 
    </Box>
  );
};

export default CodeEditor;