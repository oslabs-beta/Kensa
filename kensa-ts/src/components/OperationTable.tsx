import React, { useCallback, useContext, useState } from 'react';
import { QueryType, OperationLogTable } from '../types/types';
import { randomBgColor } from '../util/utilFunctions';
import { ChartContext } from './MetricContainer';

// type OperationTableProps = {
//   historyLogs: Array<QueryType>;
//   setOperation: (op: string) => void;
// }

type SortKeys = "id" | "operation_name" | "req_count" | "avg_res_size" | "avg_res_time" | "error_count"

type SortOrder = 'ascn' | 'desc' 


const OperationTable = () => {
  // Grab context values passed from MetricContainer
  const { historyLogs, setOperation, metricsData, setMetricsData } = useContext(ChartContext);

  const [sortKey, setSortKey] = useState<SortKeys>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');

  // Headers for operation table
  const headers: { key: SortKeys, label: String }[] = [
    { key: 'id', label: 'ID' },
    { key: 'operation_name', label: 'Operation Name' },
    { key: 'req_count', label: 'Request Count' },
    // { key: 'avg_res_size', label: 'Avg Response Size' },
    { key: 'avg_res_time', label: 'Avg Response Time' },
    // { key: 'error_count', label: 'Error Count' },
  ];
  
  // Total execution time of each operation
  const totalResTime = historyLogs.reduce((obj: any, query: QueryType) => {
    const operationName = query.operation_name;
    if (!obj[operationName]) obj[operationName] = 0;
    obj[operationName] += query.execution_time;

    return obj;
  }, {});

  // Total request counts of each operation
  const operationReqCount = historyLogs.reduce((obj: any, query: QueryType) => {
    const operationName = query.operation_name;
    if (!obj[operationName]) obj[operationName] = 0;
    obj[operationName] += 1;

    return obj;
  }, {});

  // An array of all operation with total request counts and average response time
  const operationLog: OperationLogTable[] = Object.keys(operationReqCount).map((operationName: string, index: number) => {
    const reqCount = operationReqCount[operationName];
    const averageResTime = totalResTime[operationName] / reqCount;

    return {
      id: index + 1,
      operation_name: operationName,
      req_count: reqCount,
      avg_res_time: Math.round(averageResTime)
    };
  });

  // Return sorted data base on sortKey
  const sortData: () => OperationLogTable[] = useCallback(() => {
    if (!sortKey) return operationLog;
    
    const sortedData = operationLog.sort((a: any, b: any) => {
      if (sortKey === 'operation_name') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      }
      return Number(a[sortKey]) > Number(b[sortKey]) ? 1 : -1;
    });
    
    if (sortOrder === 'desc') return sortedData.reverse();
     
    return sortedData;
  }, [operationLog, sortKey, sortOrder]);

  // Sort data in ascending/descending order
  const changeSort = (key: SortKeys): void => {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
    setSortKey(key);
  };

  // Event handler to show metrics(chart, query, visualization) when operation is clicked
  const handleShowMetrics = (query: QueryType): void => {
    setOperation(query.operation_name);
    
    // Filter to get only the current operation in state
    const operationMetrics: string[] = historyLogs.filter((log: QueryType) => log.operation_name === query.operation_name);
    
    // update state for metricsData to display chart accordingly
    setMetricsData({
      ...metricsData,
      labels: operationMetrics.map((data: any) => data.created_at),
      datasets: [{
        label: 'Execution Time',
        data: operationMetrics.map((data: any) => data.execution_time),
        backgroundColor: operationMetrics.map((data: any) => randomBgColor())
      }]
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map(row => {
            return (
              <td key={row.key}>
                {row.label}
                <button onClick={() => changeSort(row.key)} className={`${
                  sortKey === row.key && sortOrder === 'desc' ? 'sort-btn sort-reverse' : 'sort-btn'
                }`}>▲</button>
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortData().map((query: any) => {
          return (
            <tr key={query.id} onClick={() => handleShowMetrics(query)}>
              <td>{query.id}</td>
              <td>{query.operation_name}</td>
              <td>{query.req_count}</td>
              {/* <td>{query.avg_res_size}</td> */}
              <td>{query.avg_res_time}</td>
              {/* <td>{query.error_count}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OperationTable;