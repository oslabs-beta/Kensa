import React, { useState } from "react";
import { Grid, GridItem, Stack, Heading, Text } from '@chakra-ui/react';
import HistoryLogDev from "./HistoryLogDev";
import CodeEditor from "./CodeEditor";
import PlaygroudQueryResponse from "./PlaygroudQueryResponse";
import PlaygroundTreeVis from './PlaygroundTreeVis';


const PlaygroundContainer = () => {
  const [resData, setResData] = useState<string>('');

  return (
    <Stack direction='column' p='20px' id='playground-container'>
      <Heading size='md' marginBottom={1}>Playground</Heading>
      <Grid id='playground'>
        <GridItem >
          <Text>Playground</Text>
          <CodeEditor className='playground-items' setResData={setResData} />
        </GridItem>
        <GridItem>
          <Text>Tree Structure</Text>
          <PlaygroundTreeVis resData={resData}/>
        </GridItem>
        <GridItem>
          <Text>Response</Text>
          <PlaygroudQueryResponse className='playground-items' resData={resData} />
        </GridItem>
        <GridItem>
          <Text>History Log</Text>
          <HistoryLogDev className='playground-items' />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default PlaygroundContainer;