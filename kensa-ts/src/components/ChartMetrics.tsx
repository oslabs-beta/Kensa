import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';

// Render all info related to operation
const ChartMetrics = ({ operation }: any) => {
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
            Chart
          </TabPanel>
          <TabPanel>
            Query
          </TabPanel>
          <TabPanel>
            Visualize
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ChartMetrics;