import React, { useContext, useEffect, useState } from 'react';
import Tree  from 'react-d3-tree';
import { ThemeContext } from './App';
import { queryTransform } from '../util/utilFunctions';

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        time: '10m/s',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

const styles = {
  nodes: {
    node: {
      circle: {
        fill: '#52e2c5',
      },
      attributes: {
        stroke: '#000',
      },
    },
    leafNode: {
      circle: {
        fill: 'transparent',
      },
      attributes: {
        stroke: '#000',
      },
    },
  },
};



const PlaygroundTreeVis = ({ resData, query }: any) => {
  const { theme } = useContext(ThemeContext);
  const [objQuery, setObjQuery ] = useState<any>(null);
  // When they submit the query call the queryTransform inside use effect 
  // and update the object in tree
  useEffect(() => {
    if(resData) {
      setObjQuery(queryTransform(query));
    }
  }, [resData]);

  // const layout: { x: number, y: number } = { x: -20, y: -20 };
  // const getDynamicPathClass = ({ source, target}, orientation) => {
  //   if (!target.children) {
  //     // Target node has no children -> this link leads to a leaf node.
  //     return 'link__to-leaf';
  //   }

  //   // Style it as a link connecting two branch nodes by default.
  //   return 'link__to-branch';
  // };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '38em', height: '38em' }} >
      {objQuery && (
        <Tree 
          data={objQuery} 
          zoom={.8} translate={{ x: 100, y: 300 }} 
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          enableLegacyTransitions={true}/>
      )}
    </div>
  );
};

export default PlaygroundTreeVis;

