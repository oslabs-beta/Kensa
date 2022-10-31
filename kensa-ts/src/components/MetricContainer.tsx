import * as React from "react";
import HistoryLog from "./HistoryLog";

type Query = {
    created_at: string,
    exection_time: 11,
    query_string: string,
    success: boolean
}

type MetricContainerProps = {
    historyLogs: Query[]
}

const MetricContainer = (props:any) => {
  // console.log('metric container', props);

  return (
    <div id="metric-container" className="secondary-container">
      <h2>Project Metrics</h2>
      <HistoryLog logs={props.historyLog}/>
    </div>
  );
};

export default MetricContainer;