import { Box } from '@chakra-ui/react';
import { tree } from 'd3';
import React, { useContext, useEffect, useState , useRef } from 'react';
import treeUtil  from 'react-d3-tree';
import Tree  from 'react-d3-tree';
import { Button } from "@chakra-ui/react";
import { ThemeContext } from './App';

const orgChart = {
  name: 'Example',
  children: [
    {
      name: 'test',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'test',
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
          name: 'test',
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

const PlaygroundTreeVis = ({ resData}: any) => {
  const { theme } = useContext(ThemeContext);
  const tree = useRef(null);
  useEffect(() => {
    if (tree.current) {
      tree.current.setValue(resData);
    }
  }, [resData]);

  
  const handleEditorDidMount = (tree: any) => {
    tree.current = tree;
  };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '60em', height: '30em' }}>
      <Tree 
        data={resData ? resData.data : orgChart} 
        zoom={.8} translate={{ x: 50, y: 250 }} 
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        enableLegacyTransitions={true}/>
    </div>
  );
}

export default PlaygroundTreeVis;

