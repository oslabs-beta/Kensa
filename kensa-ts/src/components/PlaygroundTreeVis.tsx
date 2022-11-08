import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import Tree  from 'react-d3-tree';
import { Button } from "@chakra-ui/react";
import { ThemeContext } from './App';

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

const queryTransform = ( query: string  )=> {
  // Clean the query from '\n' and spaces and non wanted characters and form an array
  const clearQuery = (end = 0, str = '', isFirst = true) =>{
    const queryArr: Array<string> = [];
    while (end < query.length) {
      if(query[end] === ' '){
        if(isFirst) isFirst = false;
        if(str.length > 0) {
          queryArr.push(str.split('\n').join(''));
          str = '';
        }
      } else if(query[end] === "}"){
        queryArr.push('}');
        end++;
      } else if(query[end] === '('){
        console.log('IN', end)
        let i = end;
        while(query[i] !== ')' && i < query.length){
          i++;
        }
        end = i;
        console.log(end)
      } else {
        if(!isFirst)str += query[end];
      }
      end++;
    }
    return queryArr;
  };

  // Build array with clean query
  const arr: Array<string> = clearQuery();

  // If name is not provided add default as name
  if(arr[0] === '{') arr.unshift('default name');
  const treeObject: {name: string, children: Array<any>} = {name: arr[0], children: []};

  // recursively built the nested objects in the format required for the D3 tree component
  // Format: { name: string!, attributes: string, children: Array<string> }
  const recurseFunc = (arr: Array<string>, index:any = 0 )  =>{
    const arrObjs: Array<any> = [];
    let numObj = 0;
    while (index < arr.length){
      const element = arr[index];
      let temp = [];
      if(element[0] === '{'){
        temp = recurseFunc(arr, index + 1);
        arrObjs[numObj].children = temp[0];
        numObj++;
        index = temp[1];
      } else if(element === '}'){
        return [arrObjs, index];
      } else {
        arrObjs.push({name: element});
      }
      index++;
    }
    return [arrObjs, index];
  };

  // If object has an opening bracket build the children array with the parameters
  if(arr[1][0] === '{') treeObject.children = recurseFunc(arr.slice(2, arr.length))[0];
  return treeObject;
};

const PlaygroundTreeVis = ({ resData, query}: any) => {
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
    <div id="treeWrapper" style={{ width: '60em', height: '30em' }} >
      <Tree 
        data={objQuery ? objQuery : orgChart} 
        zoom={.8} translate={{ x: 50, y: 250 }} 
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        enableLegacyTransitions={true}/>
    </div>
  );
}

export default PlaygroundTreeVis;

