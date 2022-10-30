import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

import PlaygroundContainer from "./PlaygroundContainer";
import MetricContainer from "./MetricContainer";
import ProjectInfo from './ProjectInfo';

const Monitor = () => {
<<<<<<< HEAD
    // const navigate = useNavigate();
    const params = useParams();
    const [projectInfo, setProjectInfo] = React.useState(false);
=======
  // const navigate = useNavigate();
  const params = useParams();
  const [projectInfo, setProjectInfo] = React.useState(false);
>>>>>>> 08232d5bbf8cfe184d5eb69ef4ae171bfdc11ff2

  const projectId = params.projectId;

  const projectQueryString = `
        project(id: ${projectId}) {
            project_name
            server_url
            api_key
            user {
                username
            }
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

<<<<<<< HEAD
    // let { error, data, loading } = useQuery(GET_PROJECT_DATA);
    const {error, data, loading} = useQuery(GET_PROJECT_DATA, {
        // pollInterval: 5000,
    });
=======
  // let { error, data, loading } = useQuery(GET_PROJECT_DATA);
  const {error, data, loading} = useQuery(GET_PROJECT_DATA, {
    // pollInterval: 5000,
  });
>>>>>>> 08232d5bbf8cfe184d5eb69ef4ae171bfdc11ff2

  if (loading) {
    return <></>;
  }

<<<<<<< HEAD
    return (
        <div>
            <h2>Project Name: {data.project['project_name']}</h2>
            <a href={`../user/${data.project.user.username}`}><h4>Back to Projects</h4></a>
            <button onClick={() => {setProjectInfo(!projectInfo)}}>Project Info</button>
            {projectInfo ? <ProjectInfo projectId={projectId} apiKey={data.project['api_key']}/> : null}
            <div id="main-monitor">
                <PlaygroundContainer />
                <MetricContainer historyLog={data.project['history_log']}/>
            </div>
        </div>
    );
=======
  return (
    <div>
      <h2>Project Name: {data.project['project_name']}</h2>
      <a href={`../user/${data.project.user.username}`}><h4>Back to Projects</h4></a>
      <button onClick={() => {setProjectInfo(!projectInfo);}}>Project Info</button>
      {projectInfo ? <ProjectInfo projectId={projectId} apiKey={data.project['api_key']}/> : null}
      <div id="main-monitor">
        {/* <PlaygroundContainer /> */}
        <MetricContainer historyLog={data.project['history_log']}/>
      </div>
    </div>
  );
>>>>>>> 08232d5bbf8cfe184d5eb69ef4ae171bfdc11ff2
};

export default Monitor;