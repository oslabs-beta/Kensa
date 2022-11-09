import React, { useRef, useContext, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { ThemeContext } from './App';

const PlaygroudQueryResponse = ({ resData }: any) => {
  const { theme } = useContext(ThemeContext);
  const editorRef = useRef(null);
  // Display new value in editor when resData changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(resData);
    }
  }, [resData]);

  // Save editor instance to editorRef.current after editor is mounted
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return ( 
    <Editor
      height='280px'
      width='500px' 
      theme={theme === 'dark' ? 'vs-dark' : ''}
      defaultLanguage='graphql'
      defaultValue='// response'
      onMount={handleEditorDidMount}
      options={{
        readOnly: true,
        bracketPairColorization: { enabled: true }
      }}
    />
  );
};

export default PlaygroudQueryResponse;