import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
// import HistoryLog from "./HistoryLog";
import OperationTable from "./OperationTable";
import { Flex, Box, Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import ChartContainer from "./ChartContainer";
import { QueryType } from '../types/types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);   // Need this in order for chartjs2 to work with React
import { randomBgColor } from '../util/utilFunctions';

// type Query = {
//     operation_name: string,
//     query_string: string,
//     created_at: string,
//     exection_time: 11,
//     success: boolean 
// }

type MetricContainerProps = {
    historyLogs: QueryType[]
}

// OperationTable on the left side
// When click on operation name, show ChartContainer on the right side
// ChartContainer has 3 tabs (chart, query, visualize)

const MetricContainer = ({ historyLogs }: MetricContainerProps) => {
  const [operation, setOperation] = useState<string>('');

  const operationMetrics = historyLogs.filter((op: QueryType) => op.operation_name === operation);

  const [metricsData, setMetricsData] = useState({
    labels: operationMetrics.map((data: any) => data.created_at),
    datasets: [{
      label: 'Execution Time',
      data: operationMetrics.map((data: any) => data.execution_time),
      backgroundColor: operationMetrics.map((data: any) => randomBgColor()) 
    }],
    borderColor: 'black',
    borderWidth: 2,
    barThickness: 70
  });

  // Filter to extract metrics related to operation from historyLogs

  return (
    <Flex mt='20px' gap={'30px'}>
      <Box flex='1'><OperationTable historyLogs={historyLogs} setOperation={setOperation} metricsData={metricsData} setMetricsData={setMetricsData}/></Box>
      <Box flex='1'>
        {operation !== '' && <ChartContainer operation={operation} historyLogs={historyLogs} metricsData={metricsData}  />}
      </Box>
      {/* <HistoryLog logs={props.historyLog}/> */}
    </Flex>
  );
};

export default MetricContainer;