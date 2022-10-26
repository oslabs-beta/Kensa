import * as React from "react";
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

import PlaygroundContainer from "./PlaygroundContainer";
import MetricContainer from "./MetricContainer";

const Monitor = () => {
    const params = useParams();
    const [project, setProject] = React.useState();
    // console.log(params); // {projectId: '1'}

    const projectId = params.projectId;

    const projectQueryString = `
        project(id: ${projectId}) {
            project_name,
            server_url,
            history_log {
            query_string
            execution_time
            created_at
            success
            }
        }
    `;

    const GET_PROJECT_DATA = gql`
        query {
            ${projectQueryString}
        }
    `;

    const { error, data, loading} = useQuery(GET_PROJECT_DATA);

    if (loading) {
        return <></>;
    };

    // console.log(data); 

    return (
        <div>
            <h2>Project Name: {data.project['project_name']}</h2>
            <div id="main-monitor">
                <PlaygroundContainer />
                <MetricContainer historyLog={data.project['history_log']}/>
            </div>
        </div>
    );
};

export default Monitor;