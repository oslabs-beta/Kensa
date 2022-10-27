import * as React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from "@apollo/client";

import PlaygroundContainer from "./PlaygroundContainer";
import MetricContainer from "./MetricContainer";

const Monitor = () => {
    const navigate = useNavigate();
    const params = useParams();
    // const [project, setProject] = React.useState();
    // console.log(params); // {projectId: '1'}

    const projectId = params.projectId;

    const projectQueryString = `
        project(id: ${projectId}) {
            project_name
            server_url
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

    const { error, data, loading} = useQuery(GET_PROJECT_DATA);

    // this mutation string deletes a project in the Kensa's database based on project id
    const DELETE_PROJECT = gql`
        mutation DELETE_PROJECT($deleteProjectId: ID!) {
            deleteProject(id: $deleteProjectId) {
                user {
                    username
                }
            }
        }
    `;

    // custom hook for creating new project using the ADD_PROJECT mustation string above
    const [ deleteProject, {data: mutationData} ] = useMutation(DELETE_PROJECT, {
        onCompleted: () => {
            console.log(mutationData);
            const user = mutationData.deleteProject.user.username;
            const path = `../user/${user}`;
            navigate(path);
        }
    });

    if (loading) {
        return <></>;
    };

    return (
        <div>
            <h2>Project Name: {data.project['project_name']}</h2>
            <a href={`../user/${data.project.user.username}`}><h4>Back to Projects</h4></a>
            <button id="delete-project" onClick={():void => {
                deleteProject({variables: { deleteProjectId: projectId }});
            }}>Delete Project</button>
            <div id="main-monitor">
                <PlaygroundContainer />
                <MetricContainer historyLog={data.project['history_log']}/>
            </div>
        </div>
    );
};

export default Monitor;