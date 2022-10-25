import * as React from "react";
import { createTaggedTemplate } from "typescript";

type QueryLog = {
    created_at: string,
    execution_time: number,
    query_string: string,
    success: boolean
}

const QueryLog = (props:QueryLog) => {
    console.log(props);
    const createdAt = new Date(parseInt(props["created_at"])).getMonth();
    // console.log(createdAt)

    return (
        <div className="query-log">
            <h4>Query: {props.query_string}</h4>
            <p>Execution time: <span>{props["execution_time"]}</span></p>
            <p>Success: <span>{props.success ? 'success' : 'error'}</span></p>
            <p>Created at: <span>{createdAt}</span></p>
        </div>
    );
};

export default QueryLog;