import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import ProjectCard from "./ProjectCard";

const Projects = () => {
    let navigate = useNavigate();
    const toAddProjectPage = ():void => {
        const path = 'new';
        navigate(path);
    }

    const userId:number = 1;
    const userQueryString = `
        user(id: ${userId}) {
            username
            projects {
                id
                project_name
                api_key
                
            }
        }
    `;

    const GET_USER = gql`
        query {
            ${userQueryString}
        }
    `;

    const { error, data, loading } = useQuery(GET_USER);
    
    if (loading) {
        return <></>;
    };
    
    const projects = data.user.projects;
    const projectCards: Array<JSX.Element> = [];

    for (let i = 0; i < projects.length; i++) {
        console.log(projects[i])
        const projectName = projects[i]["project_name"];
        const projectId = projects[i]["id"];
        const apiKey = projects[i]["api_key"];

        projectCards.push(<ProjectCard projectName={projectName} apiKey={apiKey} projectId={projectId} key={i} />);
    }

    return (
        <div className="secondary-container">
            <h2>{`Welcome back, ${data.user.username}`}</h2>
            {/* Display Projects */}
            <div id="projects-container">
                {projectCards}
            </div>

            {/* Add Project Button */}
            <button onClick={toAddProjectPage}>+</button>
        </div>
    );
};

export default Projects;