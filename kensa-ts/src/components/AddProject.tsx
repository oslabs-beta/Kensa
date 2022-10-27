import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';

type AddProjectType = {
    userId: number | string | null
};

const AddProject = () => {
    const navigate = useNavigate();
    const params = useParams();

    const queryUserId = `
        username(username: "${params.username}") {
            id
        }
    `;

    const GET_PROJECT_DATA = gql`
        query {
            ${queryUserId}
        }
    `;

    const { error, data, loading} = useQuery(GET_PROJECT_DATA);

    const toMonitorPage = (projectId:number):void => {
        const path = `../monitor/${projectId}`;
        navigate(path);
    }
    
    const backToUserPage = ():void => {
        const path = `../user/${params.username}`;
        navigate(path);
    }

    // this function creates and returns an apikey
    // along with all the data required to create a new project
    const getProjectInfo = () => {
        const apiKey: string = uuidv4(); // create new api key (32 characters of alpha and numerics)
        const projectName = (document.getElementById("newProjectName") as HTMLInputElement).value.trim();
        const projectUrl = (document.getElementById("newProjectUrl") as HTMLInputElement).value.trim();
        const userId = data.username.id;
        // console.log(apiKey, '\n', projectName, '\n', projectUrl, '\n', userId);

        return {apikey: apiKey, projectName: projectName, serverUrl: projectUrl, user: userId};
    }

    // this mutation string creates a new project in Kensa's database
    const ADD_PROJECT = gql`
            mutation AddProject ($projectName: String!, $apiKey: String!, $serverUrl: String!, $user: String!) {
                addProject(project_name: $projectName, api_key: $apiKey, server_url: $serverUrl, user: $user) {
                    id
                    project_name
                }
            }
        `;
        
    // custom hook for creating new project using the ADD_PROJECT mustation string above
    const [ addProject, {data: mutationData} ] = useMutation(ADD_PROJECT, {
        onCompleted: () => {
            const projectId = mutationData.addProject.id;
            toMonitorPage(Number(projectId));
        }
    });

    return (
        <div>
            <h2>Add Project</h2>
            <form id="add-project-form" onSubmit={(e: React.SyntheticEvent):void => {
                e.preventDefault();
                const {apikey, projectName, serverUrl, user} = getProjectInfo();
                addProject({variables: {projectName: projectName, apiKey: apikey, serverUrl: serverUrl, user: user}});
            }}>
                <label htmlFor="projectName">Project Name:</label>
                <input type="text" name="projectName" id="newProjectName" required />
                <br />
                <label htmlFor="projectUrl">Default URL:</label>
                <input type="text" name="projectUrl" id="newProjectUrl" required />
                <br />
                <button onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const {apikey, projectName, serverUrl, user} = getProjectInfo();
                    addProject({variables: {projectName: projectName, apiKey: apikey, serverUrl: serverUrl, user: user}});
                    }}>Create</button>
            </form>
                <button onClick={backToUserPage}>Cancel</button>
        </div>
    );
};

export default AddProject;