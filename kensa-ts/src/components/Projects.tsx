import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Cookies from 'js-cookie';

import ProjectCard from "./ProjectCard";

const Projects = () => {
  const navigate = useNavigate();
  const {username} = useParams();
  // logic check - check for token, make sure they have the token with decode
  const token = Cookies.get('token');
  const userInCookie = Cookies.get('username');
  console.log('username in projects ', username, userInCookie);
  if (!token || userInCookie !== username) {
    return (
      <div>Please login. You don't have access to this page</div>
    );
  }
    
  const toAddProjectPage = ():void => {
    const path = 'new';
    navigate(path);
  };

  const userQueryString = `
        username(username: "${username}") {
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
  }
  // console.log(data.username.projects)

  const projects = data.username.projects;
  const projectCards: Array<JSX.Element> = [];

  for (let i = 0; i < projects.length; i++) {
    // console.log(projects[i])
    const projectName = projects[i]["project_name"];
    const projectId = projects[i]["id"];
    const apiKey = projects[i]["api_key"];

    projectCards.push(<ProjectCard projectName={projectName} apiKey={apiKey} projectId={projectId} key={i} />);
  }

  return (
    <div className="secondary-container">
      <h2>{`Welcome back, ${data.username.username}`}</h2>
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