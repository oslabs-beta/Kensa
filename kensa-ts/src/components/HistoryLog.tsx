import * as React from "react";
import QueryLog from "./QueryLog";

const HistoryLog = (props:any) => {
    // console.log(props);
    const fullLogs = props.logs;

    const logs: Array<JSX.Element> = [];
    for (let i = 0; i < fullLogs.length; i++) {
        logs.push(<QueryLog created_at={fullLogs[i]["created_at"]} execution_time={fullLogs[i]["execution_time"]} query_string={fullLogs[i]["query_string"]} success={fullLogs[i]["success"]} key={i} />);
    }

    return (
        <div>
            <h3>HistoryLogs</h3>
            {logs}
        </div>
    );
};

export default HistoryLog;