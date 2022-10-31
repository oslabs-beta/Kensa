import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);   // Need this in order for chartjs2 to work with React
// import { QueryType } from '../types/types';

// x-axis is time
// y-axis is execution_time



const Chart = ({ operation, historyLogs, metricsData }: any) => {
  // console.log('metrics props', historyLogs);

  // Filter to extract metrics related to operation from historyLogs
  // const operationMetrics = historyLogs.filter((op: QueryType) => op.operation_name === operation);

  // const [chartData, setChartData] = useState(operationMetrics);
  // console.log('chart data', chartData)

  // const [metricsData, setMetricsData] = useState({
  //   labels: operationMetrics.map((data: any) => data.created_at),
  //   datasets: [{
  //     label: 'Execution Time',
  //     data: operationMetrics.map((data: any) => data.execution_time),
  //     backgroundColor: operationMetrics.map((data: any) => randomBgColor()) 
  //   }],
  //   borderColor: 'black',
  //   borderWidth: 2,
  //   barThickness: 70
  // });

  // console.log(metricsData)

  return (
    <>
      <Bar data={metricsData} />
    </>
  );
};

export default Chart;