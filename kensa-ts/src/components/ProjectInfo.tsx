import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

type ProjectInfoType = {
    projectId: string,
    apiKey: string
}

const ProjectInfo = (props: ProjectInfoType) => {
  let navigate = useNavigate();
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
      // console.log(mutationData);
      const user = mutationData.deleteProject.user.username;
      const path = `../user/${user}`;
      navigate(path);
    }
  });

  return (
    <div id="project-info">
      <h3>Project Info</h3>
      <div>
        <h4>Project API: <span>{props.apiKey}</span></h4>
        <button id="delete-project" onClick={():void => {
          deleteProject({variables: { deleteProjectId: props.projectId }});
        }}>Delete Project</button>
      </div>
    </div>
  );
};

export default ProjectInfo;