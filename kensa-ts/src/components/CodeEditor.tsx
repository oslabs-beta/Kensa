import React, { useContext, useState } from 'react';
import Editor from '@monaco-editor/react';
import { languages, editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Box, Button, Flex } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { ThemeContext } from './App';

const CodeEditor = () => {
  const { theme } = useContext(ThemeContext);
  const [query, setQuery] = useState<string>('');

  const handleEditorChange = (value?: string, event?: editor.IModelContentChangedEvent): any => {
    console.log(typeof value);
    setQuery(value);
  };

  const handleQuerySubmit = () => {
    console.log(query);
  }

  const operationName = query.slice(query.indexOf(' '), query.indexOf('{'));
  console.log(operationName);

  return (
    <Box id='code-editor' position='relative'>
      <Editor 
        onChange={handleEditorChange} 
        height='348px' 
        theme={theme === 'dark' ? 'vs-dark' : ''}
        defaultLanguage='graphql'
        defaultValue='// type your query here'
      />
      <Button justifyContent='center' position='absolute' top='2px' right='0' w='fit-content' h='30px' fontSize='0.8rem' colorScheme='facebook' color='white'>
        <BsFillPlayFill fontSize='1rem' />
        <Box marginLeft='5px'>{operationName.length > 0 ? operationName : 'Run'}</Box>
      </Button> 
    </Box>
  );
};

export default CodeEditor;