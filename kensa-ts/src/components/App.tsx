import * as React from 'react';

import Navbar from './Navbar';
import MainContainer from './MainContainer';
import Kensa from './Kensa';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box bgColor='rgb(249, 250, 251)'>
      {/* <Navbar />  move to landing page */}
      {/* Main Routes Container */}
      <MainContainer />
    </Box>
  );
}
export default App;