export const randomBgColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue})`;
};

// Util function to transform query string to structure used for D3 Tree
export const queryTransform = ( query: string ) => {
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