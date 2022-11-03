import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type ProjectCardPropsType = {
    projectName: string,
    projectId: number,
    apiKey: string
}

const ProjectCard = (props: ProjectCardPropsType) => {
  return (
    <Link to={`monitor/${props.projectId}`}>
      <Center h='200px' w='200px' id='project-card' borderRadius='10px' boxShadow={'md'}>
        <Heading size='md'>{props.projectName}</Heading>
      </Center>
    </Link>
  );
};

export default ProjectCard;