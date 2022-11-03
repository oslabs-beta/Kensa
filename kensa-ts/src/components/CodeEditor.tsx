import React, { useContext, useState } from 'react';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Box, Button, Flex } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { ThemeContext } from './App';

const CodeEditor = ({ setResData }: any) => {
  const { theme } = useContext(ThemeContext);
  const [query, setQuery] = useState<string>('');

  const handleEditorChange = (value?: string, event?: editor.IModelContentChangedEvent): any => {
    setQuery(value);
  };

  const handleQuerySubmit = () => {
    fetch('http://localhost:3050/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    }).then(res => res.json())
      .then(responseData => {
        setResData(JSON.stringify(responseData.data, null, 2));
      })
      .catch(err => console.log(err));
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
    </Box>
  );
};

export default CodeEditor;