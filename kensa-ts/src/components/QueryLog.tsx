import * as React from "react";
import { createTaggedTemplate } from "typescript";

type QueryLog = {
    created_at: string,
    execution_time: number,
    query_string: string,
    success: boolean
}

const QueryLog = (props:QueryLog) => {
  // console.log(props);
  const months:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const createdAtMonth = new Date(parseInt(props["created_at"])).getMonth();
  const createdAtDate = new Date(parseInt(props["created_at"])).getDate();
  const createdAtYear = new Date(parseInt(props["created_at"])).getFullYear();

  return (
    <div className="query-log">
      <h4>Query: {props.query_string}</h4>
      <p>Execution time: <span>{props["execution_time"]}</span></p>
      <p>Success: <span>{props.success ? 'success' : 'error'}</span></p>
      <p>Created at: <span>{months[createdAtMonth]}&nbsp;{createdAtDate},&nbsp;{createdAtYear}</span></p>
    </div>
  );
};

export default QueryLog;