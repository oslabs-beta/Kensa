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
    <Center h='40px' w='500px' bgColor='white' borderRadius='10px' boxShadow={'lg'}>
      <Link to={`monitor/${props.projectId}`}>
        <Heading size='md'>{props.projectName}</Heading>
      </Link>
    </Center>
  );
};

export default ProjectCard;