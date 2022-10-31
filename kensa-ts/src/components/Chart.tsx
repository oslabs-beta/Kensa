import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChartContext } from './MetricContainer';
import { Heading } from '@chakra-ui/react';
ChartJS.register(...registerables);   // Need this in order for chartjs2 to work with React

const Chart = () => {
  const { operation, metricsData } = useContext(ChartContext);

  return (
    <>
      <Heading size='md'>{operation}</Heading>
      <Bar data={metricsData} />
    </>
  );
};

export default Chart;