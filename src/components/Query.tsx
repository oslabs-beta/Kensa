import { Textarea } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { QueryType } from '../types/types';
import { ChartContext } from './MetricContainer';

const Query = () => {
  const { operation, historyLogs } = useContext(ChartContext);


  const queryString = historyLogs.find((log: QueryType) => log.operation_name === operation).query_string;

  return (
    <Textarea readOnly value={queryString} size='sm' h='300px' />
  );
};

export default Query;