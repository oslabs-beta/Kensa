import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
// import HistoryLog from "./HistoryLog";
import OperationTable from "./OperationTable";
import { Flex, Box, Center, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import ChartContainer from "./ChartContainer";
import { Query } from '../types/types';

// type Query = {
//     operation_name: string,
//     query_string: string,
//     created_at: string,
//     exection_time: 11,
//     success: boolean 
// }

type MetricContainerProps = {
    historyLogs: Query[]
}

// OperationTable on the left side
// When click on operation name, show ChartContainer on the right side
// ChartContainer has 3 tabs (chart, query, visualize)

const MetricContainer = ({ historyLogs }: MetricContainerProps) => {
  const [operation, setOperation] = useState<string>('');

  return (
    <Flex mt='20px' gap={'30px'}>
      <Box flex='1'><OperationTable historyLogs={historyLogs} setOperation={setOperation}/></Box>
      <Box flex='1'>
        {operation !== '' && <ChartContainer operation={operation} />}
      </Box>
      {/* <HistoryLog logs={props.historyLog}/> */}
    </Flex>
  );
};

export default MetricContainer;