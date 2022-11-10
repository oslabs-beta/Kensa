import React, { useEffect, useState } from 'react';
import Tree  from 'react-d3-tree';
import { queryTransform } from '../util/utilFunctions';

const PlaygroundTreeVis = ({ resData, query }: any) => {
  const [objQuery, setObjQuery ] = useState<any>(null);
  // When they submit the query call the queryTransform inside use effect 
  // and update the object in tree
  useEffect(() => {
    if(resData) {
      setObjQuery(queryTransform(query));
    }
  }, [resData]);

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

