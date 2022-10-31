import React, { useState } from "react";
import HistoryLog from "./HistoryLog";
import { metricsData } from '../data/metricsData';
import OperationTable from "./OperationTable";
import { Flex, Box } from "@chakra-ui/react";
import ChartMetrics from "./ChartMetrics";

// type Query = {
//     operation_name: string,
//     query_string: string,
//     created_at: string,
//     exection_time: 11,
//     success: boolean 
// }

// type MetricContainerProps = {
//     historyLog: Query[]
// }

// OperationTable on the left side
// When click on operation name, show ChartMetrics on the right side
// ChartMetrics has 3 tabs (chart, query, visualize)

const MetricContainer = (props: any) => {
  const [operation, setOperation] = useState<string>('');

  return (
    <Flex mt='20px' gap={'30px'}>
      <Box flex='1'><OperationTable data={metricsData} setOperation={setOperation}/></Box>
      <Box flex='1'>
        {operation !== '' && <ChartMetrics operation={operation} />}
      </Box>
      {/* <HistoryLog logs={props.historyLog}/> */}
    </Flex>
  );
};

export default MetricContainer;