import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import Chart from './Chart';
import Query from './Query';
import QueryTree from './QueryTree';

type ChartContainerProps = {
  operation: string;
}

// Render all info related to operation
const ChartContainer = ({ operation }: ChartContainerProps) => {
  return (
    <Box w='100%' bgColor='lightcyan'>
      {operation}
      <Tabs>
        <TabList>
          <Tab>Chart</Tab>
          <Tab>Query</Tab>
          <Tab>Visualize</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Chart />
          </TabPanel>
          <TabPanel>
            <Query />
          </TabPanel>
          <TabPanel>
            <QueryTree />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ChartContainer;