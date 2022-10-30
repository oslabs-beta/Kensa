import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Button, Flex, Text } from "@chakra-ui/react";

type ProjectInfoType = {
    projectId: string,
    apiKey: string
}

const ProjectInfo = (props: ProjectInfoType) => {
  const navigate = useNavigate();

  // this mutation string deletes a project in the Kensa's database based on project id
  const DELETE_PROJECT = gql`
		mutation DeleteProject ($deleteProjectId: ID!) {
			deleteProject(id: $deleteProjectId) {
				user {
						username
				}
			}
		}
	`;

  // custom hook for creating new project using the ADD_PROJECT mustation string above
  const [deleteProject, { data: mutationData }] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      const user = mutationData.deleteProject.user.username;
      const path = `/user/${user}`;
      navigate(path);
    }
  });

  return (
    <Flex direction='column' h='150px' justifyContent='space-between'>
      <Text><Text fontWeight={'bold'}>Project API:</Text> {props.apiKey}</Text>
      <Button colorScheme='facebook' onClick={(): void => {
        deleteProject({
          variables: {
            deleteProjectId: props.projectId
          }
        });
      }}>
				Delete Project
      </Button>
    </Flex>
  );
};

export default ProjectInfo;