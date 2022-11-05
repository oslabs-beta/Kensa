import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import Tree  from 'react-d3-tree';
import { Button } from "@chakra-ui/react";
import { ThemeContext } from './App';

const orgChart = {
  name: 'Your Query',
};

const queryTransform = ( query: string  )=> {
  let end = 0;
  const arr: Array<string> = [];
  let str = '';
  let isFirst = true;
  while (end < query.length) {
    if(query[end] === ' '){
      if(isFirst) isFirst = false;
      if(str.length > 0) {
        arr.push(str.split('\n').join(''));
        str = '';
      }
    } else if(query[end] === "}"){
      arr.push('}');
      end++;
    } else {
      if(!isFirst)str += query[end];
    }
    end++;
  }
  if(arr[0] === '{') arr.unshift('default');
  const treeObject: {name: string, children: Array<any>} = {name: arr[0], children: []};

  const recurseFunc = (arr: Array<string> )  =>{
    const arrObjs: Array<any> = [];
    let closeBracket = false;
    let index = 0;
    while (!closeBracket){
      const element = arr[index];
      if(element[0] === '{'){
        arrObjs[index - 1].children = recurseFunc(arr.slice(index + 1, arr.length));
        return arrObjs;
      } else if(element === '}'){
        closeBracket = true;
      } else {
        arrObjs.push({name: element});
      }
      index++;
    }
    return arrObjs;
  };
  if(arr[1][0] === '{') treeObject.children = recurseFunc(arr.slice(2, arr.length));
  return treeObject;
};

const PlaygroundTreeVis = ({ resData, query}: any) => {
  const { theme } = useContext(ThemeContext);
  const [objQuery, setObjQuery ] = useState<any>(null);
  // console.log('Response IN Tree',resData);
  // console.log('Query IN Tree',query);
  // console.log('typeof query IN Tree',typeof query);
  // When they submit the query call the queryTransform inside use effect 
  // and update the object in tree
  useEffect(() => {
    console.log('IN USE EFFECT TREE');
    console.log('query',query);
    if(resData) {
      setObjQuery(queryTransform(query));
      console.log('objQuery',objQuery);
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

