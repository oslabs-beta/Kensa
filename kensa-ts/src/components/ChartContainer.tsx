import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import Chart from './Chart';
import Query from './Query';
import QueryTree from './QueryTree';
import { QueryType } from '../types/types';

type ChartContainerProps = {
  operation: string;
  historyLogs: Array<QueryType>
}

// Render all info related to operation
const ChartContainer = ({ operation, historyLogs, metricsData }: any) => {
  // console.log('chart container', historyLogs);

  // Total request count of this operation
  // const operationReqCount = operationMetrics.length;

  return (
    <Box w='100%' id='chart-container'>
      {operation}
      <Tabs>
        <TabList>
          <Tab>Chart</Tab>
          <Tab>Query</Tab>
          <Tab>Visualize</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Chart historyLogs={historyLogs} operation={operation} metricsData={metricsData} />
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