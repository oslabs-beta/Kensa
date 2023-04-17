import React from 'react';
import { Box, Flex, Heading, Stack, Icon, Image } from '@chakra-ui/react';
import { BsFillFolderFill, BsFillPlayBtnFill, BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../assets/Kensa-cropped2.png';

const Sidebar = () => {
  return (
    <Box flex="1" id="side-bar">
      <Flex h="180px" justify="center" align="center" id="logo">
        <Link to="/">
          <Image src={logo} h="80px" w="150px" />
        </Link>
      </Flex>
      <Stack spacing={3} direction="column" marginTop={10}>
        <Link to="">
          <Flex align="center" p="20px" gap={3} className="sidebar-text">
            <Icon as={BsFillFolderFill} />
            <Heading size="sm">Projects</Heading>
          </Flex>
        </Link>
        <Link to="playground">
          <Flex align="center" p="20px" gap={3} className="sidebar-text">
            <Icon as={BsFillPlayBtnFill} boxSize="1.4rem" />
            <Heading size="sm">Playground</Heading>
          </Flex>
        </Link>
        <a
          href="https://github.com/oslabs-beta/Kensa"
          target="_blank"
          rel="noreferrer"
        >
          <Flex align="center" p="20px" gap={3} className="sidebar-text">
            <Icon as={BsGithub} boxSize="1.4rem" />
            <Heading size="sm">Docs</Heading>
          </Flex>
        </a>
      </Stack>
    </Box>
  );
};

export default Sidebar;
