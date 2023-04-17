import { Center, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

type ProjectCardPropsType = {
  projectName: string;
  projectId: string;
};

const ProjectCard = ({ projectName, projectId }: ProjectCardPropsType) => {
  return (
    <Link to={`monitor/${projectId}`}>
      <Center
        h="200px"
        w="200px"
        id="project-card"
        borderRadius="10px"
        boxShadow={'md'}
      >
        <Heading size="md">{projectName}</Heading>
      </Center>
    </Link>
  );
};

export default ProjectCard;
