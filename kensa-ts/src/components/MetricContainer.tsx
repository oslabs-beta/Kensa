import React, { useState, createContext } from "react";
// import HistoryLog from "./HistoryLog";
import OperationTable from "./OperationTable";
import { Flex, Box, Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import ChartContainer from "./ChartContainer";
import { QueryType } from '../types/types';

// Create ChartContext for historyLogs and pass down to all descendants
export const ChartContext = createContext(null);

type MetricContainerProps = {
    historyLogs: QueryType[]
}

// OperationTable on the left side
// When click on operation name, show ChartContainer on the right side
// ChartContainer has 3 tabs (chart, query, visualize)

const MetricContainer = ({ historyLogs }: MetricContainerProps) => {
  const [operation, setOperation] = useState<string>('');

  const [metricsData, setMetricsData] = useState({});

  return (
    <ChartContext.Provider value={{ historyLogs, operation, setOperation, metricsData, setMetricsData }}>
      <Flex mt='20px' gap={'30px'}>
        <Box flex='1'><OperationTable /></Box>
        <Box flex='1'>
          {operation !== '' && <ChartContainer />}
        </Box>
        {/* <HistoryLog logs={props.historyLog}/> */}
      </Flex>
    </ChartContext.Provider>
  );
};

export default MetricContainer;