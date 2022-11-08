import React, { useContext } from 'react';
import { QueryType } from '../types/types';
import { ChartContext } from './MetricContainer';
import Tree  from 'react-d3-tree';
import { queryTransform } from '../util/utilFunctions';

const QueryTree = () => {
  const { operation, historyLogs } = useContext(ChartContext);

  const queryString = historyLogs.find((log: QueryType) => log.operation_name === operation).query_string;

  // Transform query string into a structure suitable for D3 Tree
  const objQuery = queryTransform(queryString);

  return (
    <div id="treeWrapper-1" style={{ width: '30em', height: '30em' }} >
      <Tree 
        data={objQuery} 
        zoom={.8} translate={{ x: 50, y: 200 }} 
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        enableLegacyTransitions={true}/>
    </div>
  );
};

export default QueryTree;